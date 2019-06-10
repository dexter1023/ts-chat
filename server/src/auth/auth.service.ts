import { Injectable, HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { UserService } from '../user/user.service';
import { AuthPayload } from './interfaces/auth-payload.interface';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  
  async createToken(email: string) {
    const expiresIn = 6000 * 60;
    const secretOrKey = 'asfgshdsffDasdcaD';
    const user = { email };
    const token = jwt.sign(user, secretOrKey, { audience: 'urn:foo' });
    return { expires_in: expiresIn, token };
  }

  async validateUser(credentials: AuthPayload) {
    const user = await this.userService.getUserByEmail(credentials.email);
    if (!user) {
      return false;
    } else {
      compare(credentials.password, user.password, (err, hash) => {
        return !(err || !hash);
      });
    }
  }
}
