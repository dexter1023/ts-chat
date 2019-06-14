import { Model } from 'mongoose';
import { Message } from './interfaces/message.interface';
import { CreateMessageDTO } from './dto/create-message.dto';
export declare class MessageService {
    private readonly MessageModel;
    constructor(MessageModel: Model<Message>);
    saveMessage(body: CreateMessageDTO): Promise<Message>;
    getMessages(): Promise<Message[]>;
    getMessage(id: string): Promise<Message>;
    deleteMessage(id: string): Promise<any>;
}
