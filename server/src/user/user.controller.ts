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
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserService } from './user.service';
import { ValidateObjectId } from '../shared/pipes/validate-object-id.pipes';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async get(@Res() res) {
    const users = await this.userService.getAllUsers();
    res.status(HttpStatus.OK).json(users);
  }
  @Get(':id')
  async getById(@Res() res, @Param('id', new ValidateObjectId()) id) {
    const user = await this.userService.getUserById(id);
    if (!user) {
      throw new NotFoundException('User is not found!');
    } else {
      res.status(HttpStatus.OK).json(user);
    }
  }

  @Post()
  async saveUser(@Res() res, @Body() user: CreateUserDTO) {
    const User = await this.userService.saveUser(user);
    res.status(HttpStatus.OK).json(User);
  }

  @Put(':id')
  async updateUser(
    @Res() res,
    @Param('id', new ValidateObjectId()) id,
    body: CreateUserDTO,
  ) {
    const User = this.userService.updateUser(id, body);
    if (!User) {
      throw new NotFoundException('User is not found!');
    } else {
      res.status(HttpStatus.OK).json(User);
    }
  }

  @Delete(':id')
  async deleteUser(@Res() res, @Param('id', new ValidateObjectId()) id) {
    const User = this.userService.deleteUser(id);
    if (!User) {
      throw new NotFoundException('User is not found!');
    } else {
      res.status(HttpStatus.OK);
    }
  }
}
