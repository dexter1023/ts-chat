import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Message } from './interfaces/message.interface';
import { CreateMessageDTO } from './dto/create-message.dto';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel('Message') private readonly MessageModel: Model<Message>,
  ) {}

  async saveMessage(body: CreateMessageDTO): Promise<Message> {
    const message = this.MessageModel(body);
    const savedMessage = await message.save();
    return await this.MessageModel
      .findById(savedMessage._id)
      .populate('user', 'email nick')
      .exec();
  }
  async getMessages(): Promise<Message[]> {
    const messages = await this.MessageModel
      .find()
      .populate('user', 'email nick')
      .lean()
      .exec();
    return messages;
  }
  async getMessage(id: string): Promise<Message> {
    return await this.MessageModel
      .findById(id)
      .populate('user', 'email nick')
      .lean()
      .exec();
  }
  async deleteMessage(id: string): Promise<any> {
    const res = await this.MessageModel
      .findByIdAndDelete(id);
    return res;
  }
}
