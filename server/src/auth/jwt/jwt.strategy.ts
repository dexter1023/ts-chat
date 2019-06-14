import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../../user/user.service';
import { AuthPayload } from '../interfaces/auth-payload.interface';
import * as config from '../../config/config.json';

@Injectable()
export class JwtService extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.secretKey,
      passReqToCallback: true,
    },
    async (req, payload, next) => await this.validate(req, payload, next),
    );
  }

  async validate(req, payload: AuthPayload, done) {
    const user = await this.userService.getUserByEmail(payload.email);
    if (!user) {
      return done('Unauthorized', null);
    }
    req.user = user;
    done(null, payload);
  }
}
