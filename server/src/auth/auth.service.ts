import { Injectable, HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { User } from '../user/interfaces/user.interface';
import * as jwt from 'jsonwebtoken';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { WsException } from '@nestjs/websockets';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import * as config from '../config/config.json';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async createToken(payload: JwtPayload) {
    const expiresIn = 6000 * 60;
    const secretOrKey = config.secretKey;
    const token = jwt.sign(payload, secretOrKey);
    return { expires_in: expiresIn, token };
  }

  async validateToken(token: string, isWs: boolean = false): Promise<User | null> {
    const payload = jwt.verify(token, config.secretKey) as any;
    if (payload) {
      const user = await this.userService.getUserByEmail(payload.email);
      if (!user) {
        if (isWs) {
          throw new WsException('Brak dostępu, błędna autoryzacja');
        } else {
          throw new HttpException(
            'Brak dostępu, błędny token',
            HttpStatus.FORBIDDEN,
          );
        }
      } else {
        return user;
      }
    } else {
      if (isWs) {
        throw new WsException('Brak dostępu, brak dostępu, błędny token');
      } else {
        throw new HttpException(
          'Brak dostępu, błędny token',
          HttpStatus.FORBIDDEN,
        );
      }
    }
  }

  compareHash(credentialPassword: string, userPassword: string): Promise<boolean> {
    return bcrypt.compare(credentialPassword, userPassword);
  }
}
