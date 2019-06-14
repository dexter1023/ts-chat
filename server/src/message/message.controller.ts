import {
  Controller,
  Delete,
  HttpStatus,
  Res,
  Param,
  Req,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { ValidateObjectId } from '../shared/pipes/validate-object-id.pipes';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Delete(':id')
  async deleteMessage(@Req() req, @Param('id', new ValidateObjectId()) id, @Res() res) {
    const message = await this.messageService.getMessage(id);
    if (req.user && (req.user.isAdmin || req.user._id === message.user)) {
      const isDelete = await this.messageService.deleteMessage(id);
      if (!isDelete) {
        return res.status(HttpStatus.BAD_REQUEST).json({message: 'Błąd usunięcia wiadomości'});
      } else {
        return res.status(HttpStatus.OK).json({message: 'Wiadomość usunięta poprawnie'});
      }
    } else {
      return res.status(HttpStatus.FORBIDDEN).json({message: 'Brak wymaganych uprawnień do usunięcia wiadomości'});
    }
  }
}
