import { Injectable } from '@nestjs/common';
import { MessageService } from 'src/message/message.service';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';
import { Message } from 'src/message/interfaces/message.interface';
import { User } from 'src/user/interfaces/user.interface';
import { CreateMessageDTO } from 'src/message/dto/create-message.dto';

@Injectable()
export class FasadeService {
  constructor(
    private readonly messageService: MessageService,
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  async getMessages(): Promise<Message[]> {
    return await this.messageService.getMessages();
  }
  async getMessage(id: string) {
    return await this.messageService.getMessage(id);
  }
  async saveMessage(message: CreateMessageDTO): Promise<Message> {
    return await this.messageService.saveMessage(message);
  }
  async deleteMessage(id: string): Promise<any> {
    return await this.messageService.deleteMessage(id);
  }
  async getUsers(): Promise<User[]> {
    return await this.userService.getAllUsers();
  }
  async validateToken(token: string, isWs: boolean): Promise<User> {
    return await this.authService.validateToken(token, isWs);
  }
}
