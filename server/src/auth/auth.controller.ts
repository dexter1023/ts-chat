import { Controller, Post, Body, HttpStatus, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthPayload } from './interfaces/auth-payload.interface';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/interfaces/user.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly userService: UserService) {}

  @Post('login')
  async createToken(@Body() body: AuthPayload, @Res() res) {
    console.log(body);
    if (!body.password || !body.email) {
      res.status(HttpStatus.FORBIDDEN).json({ message: 'Email and password are required!' });
    } else {
      const validateUser = await this.authService.validateUser(body);
      if (validateUser) {
        res.json(this.authService.createToken(body.email));
      } else {
        return res.status(HttpStatus.FORBIDDEN);
      }
    }
  }
  @Post('register')
  async register(@Body() body: User, @Res() res) {
    if(!(body.email && body.password && body.nick)) {
      return res.status(HttpStatus.FORBIDDEN).json({ message: 'Username and password are required!' });
    } else {
      const user = await this.userService.getUserByEmail(body.email);
      if(user) {
        return res.status(HttpStatus.FORBIDDEN).json({ message: 'There is user with that credentials' });
      } else {
        const registerUser = await this.userService.saveUser(body);
        if (registerUser) {
          return res.status(HttpStatus.OK);
        } else {
          return res.status(HttpStatus.FORBIDDEN);
        }
      }
    }
  }
}
