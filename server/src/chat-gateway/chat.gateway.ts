import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  WsResponse,
  OnGatewayDisconnect,
  WsException,
} from '@nestjs/websockets';
import { User } from '../user/interfaces/user.interface';
import { Server } from 'socket.io';
import { ChatService } from '../chat/chat.service';
import { AuthService } from 'src/auth/auth.service';

@WebSocketGateway(4000, {namespace: 'rooms'})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly chatService: ChatService, private readonly authService: AuthService) {}

  @WebSocketServer()
  server: Server;

  private connectedUsers: string[] = [];

  async handleConnection(socket) {
    if (!socket.handshake.query.token) {
      throw new WsException(
        'Unauthorized',
      );
    } else {
      const user = await this.authService.validateToken(socket.handshake.query.token);
      if (!user) {
        throw new WsException(
          'Unauthorized',
        );
      } else {
        const chats = await this.chatService.getAllForUser(user._id);
        socket.emit('connected', chats);
      }
    }
  }

  @SubscribeMessage('join')
  async joinTo(socket, data) {
    data.chatId.forEach(chatId => {
      socket.join(chatId);
      socket.emit('join', {message: 'success'});
    });
  }

  handleDisconnect(socket) {
    socket.emit('disconnect', 'he');
  }

  @SubscribeMessage('message')
  async onMessage(socket: any, body: any) {
    const event: string = 'message';
    const message = await this.chatService.saveMessageToChat(body.id, body.message);
    this.server.in(body.id).emit(event, message);
  }
}
