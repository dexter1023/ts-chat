import {
  Controller,
  Delete,
  HttpStatus,
  Res,
  Param,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { ValidateObjectId } from '../shared/pipes/validate-object-id.pipes';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Delete(':id')
  async deleteMessage(@Param('id', new ValidateObjectId()) id, @Res() res) {
    const message = await this.messageService.deleteMessage(id);
    if(!message) {
      return res.status(HttpStatus.BAD_REQUEST).json({message: 'Błąd usunięcia wiadomości'});
    } else {
      return res.status(HttpStatus.OK).json({message: 'Wiadomość usunięta poprawnie'});
    }
  }
}