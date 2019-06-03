import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Request,
  HttpException,
  HttpStatus
} from '@nestjs/common';

import { MessageService } from './message.service';
import { Message } from './interfaces/message.interface';
import { CreateMessageDTO } from './dto/create-message.dto';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

}