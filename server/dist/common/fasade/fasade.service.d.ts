import { MessageService } from 'src/message/message.service';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';
import { Message } from 'src/message/interfaces/message.interface';
import { User } from 'src/user/interfaces/user.interface';
import { CreateMessageDTO } from 'src/message/dto/create-message.dto';
export declare class FasadeService {
    private readonly messageService;
    private readonly authService;
    private readonly userService;
    constructor(messageService: MessageService, authService: AuthService, userService: UserService);
    getMessages(): Promise<Message[]>;
    getMessage(id: string): Promise<Message>;
    saveMessage(message: CreateMessageDTO): Promise<Message>;
    deleteMessage(id: string): Promise<any>;
    getUsers(): Promise<User[]>;
    validateToken(token: string, isWs: boolean): Promise<User>;
}
