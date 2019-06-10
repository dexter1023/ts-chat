import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { AuthPayload } from '../interfaces/auth-payload.interface';

@Injectable()
export class JwtService extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'asfgshdsffDasdcaD',
    },
    async (req, payload, next) => await this.validate(req, payload, next)
    );
  }

  async validate(req, payload: AuthPayload, done) {
    const user = await this.authService.validateUser(payload);
    if (!user) {
      return done('Unauthorized', null)
    }
    done(null, payload);
  }

}