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
        socket.emit('connected', {message: 'Connected to chat! :)'});
      }
    }
  }

  @SubscribeMessage('join')
  async joinTo(socket, data) {
    socket.join(data.chatId);
  }

  handleDisconnect(socket) {
    socket.emit('disconnect', 'he');
  }

  @SubscribeMessage('message')
  async onMessage(socket: any, body: any) {
    const event: string = 'message';
    await this.chatService.saveMessageToChat(body.id, body.message);
    socket.broadcast.to(body.chat).emit(event, body.message);
  }
}
