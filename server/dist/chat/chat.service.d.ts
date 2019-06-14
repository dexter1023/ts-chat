import { Model } from 'mongoose';
import { Chat } from './interfaces/chat.interface';
import { MessageService } from '../message/message.service';
import { Message } from '../message/interfaces/message.interface';
import { CreateMessageDTO } from '../message/dto/create-message.dto';
import { CreateChatDTO } from './dto/create-chat.dto';
export declare class ChatService {
    private readonly ChatModel;
    private readonly messageService;
    constructor(ChatModel: Model<Chat>, messageService: MessageService);
    getAll(): Promise<Chat[]>;
    getById(id: string): Promise<Chat>;
    saveChat(body: CreateChatDTO): Promise<Chat>;
    getAllForUser(id: string): Promise<Chat[]>;
    updateChatName(id: string, name: string): Promise<Chat>;
    updateChatModerators(id: string, moderators: CreateChatDTO): Promise<Chat>;
    saveMessageToChat(id: string, message: CreateMessageDTO): Promise<Message>;
}
