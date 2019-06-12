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
import { CreateChatDTO } from 'src/chat/dto/create-chat.dto';

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
    const message = await this.service.saveMessage(body.message);
    this.server.emit(event, message);
  }
}
