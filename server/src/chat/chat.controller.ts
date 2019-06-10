import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Req,
  Res,
  HttpStatus,
  HttpException,
  Body,
  Param,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDTO } from './dto/create-chat.dto';
import { ValidateObjectId } from '../shared/pipes/validate-object-id.pipes';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get()
  async getChat(@Req() req, @Res() res) {
    const chats = this.chatService.getById(req.user._id);
    res.status(HttpStatus.OK).json(chats);
  }

  @Post()
  async saveChat(@Body() body: CreateChatDTO, @Res() res) {
    const chat = await this.chatService.saveChat(body);
    res.status(HttpStatus.OK).json(chat);
  }

  @Put(':id/name')
  async updateChat(@Res() res, @Param('id', new ValidateObjectId()) id, @Body() body: CreateChatDTO) {
    const chat = await this.chatService.updateChatName(id, body.name);
    res.status(HttpStatus.OK).json(chat);
  }
}
