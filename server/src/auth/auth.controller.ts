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
    if (!body.password || !body.email) {
      return res.status(HttpStatus.FORBIDDEN).json({ message: 'Email and password are required!' });
    } else {
      const user = await this.userService.getUserByEmail(body.email);
      if (!user) {
        return res.status(HttpStatus.FORBIDDEN).json({error: 'Bad credentials'});
      } else if (await this.authService.compareHash(body.password, user.password)) {
        const {
          email,
          _id,
          isAdmin,
        } = user;
        const token = await this.authService.createToken({email, _id, isAdmin});
        return res.json(token);
      } else {
        return res.status(HttpStatus.FORBIDDEN).json({error: 'Bad credentials'});
      }
    }
  }

  @Post('register')
  async register(@Body() body: User, @Res() res) {
    if (!(body.email && body.password && body.nick)) {
      return res.status(HttpStatus.FORBIDDEN).json({ message: 'Username and password are required!' });
    } else {
      const user = await this.userService.getUserByEmail(body.email);
      if (user) {
        return res.status(HttpStatus.FORBIDDEN).json({ message: 'There is user with that credentials' });
      } else {
        const registerUser = await this.userService.saveUser(body, false);
        if (registerUser) {
          return res.status(HttpStatus.OK).json({message: 'Correct registry'});
        } else {
          return res.status(HttpStatus.FORBIDDEN).json({message: 'Error during register user, try again'});
        }
      }
    }
  }
}
