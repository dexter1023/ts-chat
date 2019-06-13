import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  NotFoundException,
  HttpStatus,
  Res,
  Param,
  Req,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Put()
  async updateUser(
    @Req() req,
    @Res() res,
    @Body() body: CreateUserDTO,
  ) {
    const User = await this.userService.updateUser(req.user._id, body);
    if (!User) {
      throw new NotFoundException('Nie znalazłem użytkownika');
    } else {
      res.status(HttpStatus.OK).json(User);
    }
  }

  @Delete()
  async deleteUser(@Req() req, @Res() res) {
    const User = await this.userService.deleteUser(req.user._id);
    if (!User) {
      throw new NotFoundException('Nie ma takiego użytkownika');
    } else {
      res.status(HttpStatus.OK).json({message: 'Użytkownik został usunięty'});
    }
  }
}
