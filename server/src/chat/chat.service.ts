import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Chat } from './interfaces/chat.interface';
import { MessageService } from '../message/message.service';
import { CreateChatDTO } from './dto/create-chat.dto';
@Injectable()
export class ChatService {
  constructor(@InjectModel('Chat') private readonly ChatModel: Model<Chat>) {}

  async getAll(): Promise<Chat[]> {
    const chats = await this.ChatModel.find({}).exec();
    return chats;
  }

  async getById(id: string): Promise<Chat> {
    const chat = await this.ChatModel.findById(id).exec();
    return chat;
  }
  async saveChat(body: CreateChatDTO): Promise<Chat> {
    const chat = this.ChatModel(body);
    return await chat.save();
  }
  async updateChatName(id: string, name: string): Promise<Chat> {
    const chat = await this.ChatModel.findByIdAndUpdate(id, {
      $set: {
        name,
      },
    }, {new: true});
    return chat;
  }

  async updateChatModerators(id: string, moderators: ): Promise<Chat> {
    
  }
}
