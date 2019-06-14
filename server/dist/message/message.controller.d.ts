import { MessageService } from './message.service';
export declare class MessageController {
    private readonly messageService;
    constructor(messageService: MessageService);
    deleteMessage(req: any, id: any, res: any): Promise<any>;
}
