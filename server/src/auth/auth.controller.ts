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
      return res.status(HttpStatus.FORBIDDEN).json({ message: 'Email oraz hasło wymagane!' });
    } else {
      const user = await this.userService.getUserByEmail(body.email);
      if (!user) {
        return res.status(HttpStatus.FORBIDDEN).json({message: 'Błędne dane logowania'});
      } else if (await this.authService.compareHash(body.password, user.password)) {
        const {
          email,
          _id,
          isAdmin,
          nick,
        } = user;
        const token = await this.authService.createToken({nick, email, _id, isAdmin});
        return res.json(token);
      } else {
        return res.status(HttpStatus.FORBIDDEN).json({message: 'Błędne dane logowania'});
      }
    }
  }

  @Post('register')
  async register(@Body() body: User, @Res() res) {
    if (!(body.email && body.password && body.nick)) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Niekompletne dane rejestracji' });
    } else {
      const user = await this.userService.getUserByEmail(body.email);
      if (user) {
        return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Użytkownik o tym adresie już istnieje' });
      } else {
        const registerUser = await this.userService.saveUser(body, false);
        if (registerUser) {
          return res.status(HttpStatus.OK).json({message: 'Correct registry'});
        } else {
          return res.status(HttpStatus.BAD_REQUEST).json({message: 'Nieoczekiwany błąd, spróbuj za chwilę jeszcze raz'});
        }
      }
    }
  }
}
