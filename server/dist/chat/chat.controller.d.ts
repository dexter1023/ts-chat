import { ChatService } from './chat.service';
import { CreateChatDTO } from './dto/create-chat.dto';
export declare class ChatController {
    private readonly chatService;
    constructor(chatService: ChatService);
    getChat(req: any, res: any): Promise<void>;
    saveChat(body: CreateChatDTO, res: any): Promise<void>;
    updateChat(res: any, id: any, body: CreateChatDTO): Promise<void>;
}
