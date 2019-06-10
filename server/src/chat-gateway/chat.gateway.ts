import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  WsResponse,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Client, Server } from 'socket.io';
import { ChatService } from '../chat/chat.service';

@WebSocketGateway(4000, {namespace: 'rooms'})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly chatService: ChatService) {}

  @WebSocketServer()
  server: Server;

  handleConnection(client) {
    client.emit('connection', 'hhehe');
  }

  handleDisconnect(client) {
    client.emit('disconnect', 'he');
  }

  @SubscribeMessage('message')
  async onMessage(client: any, body: any) {
    const event: string = 'message';
    await this.chatService.saveMessageToChat(body.id, body.message);
    client.emit(event, body.message);
  }
}
