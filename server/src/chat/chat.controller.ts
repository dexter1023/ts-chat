import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Res,
  HttpStatus,
  HttpException,
  Body,
  Param,
} from '@nestjs/common';

import { ChatService } from './chat.service';
import { CreateChatDTO } from './dto/create-chat.dto';
import { ValidateObjectId } from '../shared/pipes/validate-object-id.pipes';

Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get()
  
}