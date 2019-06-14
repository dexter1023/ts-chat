import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { FasadeService } from 'src/common/fasade/fasade.service';
export declare class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly service;
    constructor(service: FasadeService);
    server: Server;
    handleConnection(socket: any): Promise<void>;
    handleDisconnect(socket: any): void;
    onMessage(socket: any, body: any): Promise<void>;
    onDeleteMessage(socket: any, body: any): Promise<void>;
}
