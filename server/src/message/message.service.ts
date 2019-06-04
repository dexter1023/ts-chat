import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Message } from './interfaces/message.interface';
import { CreateMessageDTO } from './dto/create-message.dto';

@Injectable()
export class MessageService {
  constructor(@InjectModel('Message') private readonly MessageModel: Model<Message>) {}

  async saveMessage(body: CreateMessageDTO): Promise<Message> {
    const message = this.MessageModel(body);
    return await message.save();
  }
}
