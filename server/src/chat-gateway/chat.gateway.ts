import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  WsResponse,
} from '@nestjs/websockets';
import { Client, Server } from 'socket.io';
import { ChatService } from '../chat/chat.service';

@WebSocketGateway(4000, {namespace: 'rooms'})
export class ChatGateway implements OnGatewayConnection {
  constructor(private readonly chatService: ChatService) {}
  @WebSocketServer()
  server: Server;
  handleConnection(client) {
    client.emit('connection', 'hhehe');
  }

  @SubscribeMessage('message')
  async onMessage(client: any, body: any) {
    const event: string = 'message';
    await this.chatService.saveMessageToChat(body.id, body.message);
    client.broadcast(event, body.message, (b) => console.log(b));
  }
}