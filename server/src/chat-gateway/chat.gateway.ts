import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  WsResponse,
  OnGatewayDisconnect,
  WsException,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { FasadeService } from 'src/common/fasade/fasade.service';

@WebSocketGateway(4000, {namespace: 'rooms'})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly service: FasadeService) {}

  @WebSocketServer()
  server: Server;

  async handleConnection(socket) {
    if (!socket.handshake.query.token) {
      throw new WsException(
        'Brak autoryzacji',
      );
    } else {
      const user = await this.service.validateToken(socket.handshake.query.token, true);
      if (!user) {
        throw new WsException(
          'Brak autoryzacji',
        );
      } else {
        socket.user = user;
        const users = await this.service.getUsers();
        const messages = await this.service.getMessages();
        const chat = {
          name: 'General',
          users,
          messages,
        };
        socket.emit('connected', chat);
      }
    }
  }

  handleDisconnect(socket) {
    socket.emit('disconnect', 'Rozłączono z czatek');
  }

  @SubscribeMessage('message')
  async onMessage(socket: any, body: any) {
    const event: string = 'message';
    const message = await this.service.saveMessage(body);
    this.server.emit(event, message);
  }

  @SubscribeMessage('deleteMessage')
  async onDeleteMessage(socket: any, body: any) {
    const message = await this.service.getMessage(body.messageId);
    if (socket.user && (socket.user.isAdmin || socket.user._id.toString() === message.user._id.toString())) {
      await this.service.deleteMessage(body.messageId);
      this.server.emit('deleteMessage', {messageId: message._id});
    } else {
      throw new WsException(
        'Brak uprawnień do usunięcia wiadomości',
      );
    }
  }
}
