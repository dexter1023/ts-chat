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
import { ValidateObjectId } from '../shared/pipes/validate-object-id.pipes';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Put()
  async updateUser(
    @Req() req,
    @Res() res,
    body: CreateUserDTO,
  ) {
    const User = this.userService.updateUser(req.user._id, body);
    if (!User) {
      throw new NotFoundException('User is not found!');
    } else {
      res.status(HttpStatus.OK).json(User);
    }
  }

  @Delete()
  async deleteUser(@Req() req, @Res() res, @Param('id', new ValidateObjectId()) id) {
    const User = this.userService.deleteUser(req.user._id);
    if (!User) {
      throw new NotFoundException('User is not found!');
    } else {
      res.status(HttpStatus.OK);
    }
  }
}
