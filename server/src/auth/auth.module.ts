import {
  Module,
  MiddlewareConsumer,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtService } from './jwt/jwt.strategy';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { authenticate } from 'passport';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secretOrPrivateKey: 'asfgshdsffDasdcaD',
      signOptions: {
        expiresIn: 6000 * 60,
      },
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService],
  exports: [PassportModule, AuthService],
})
export class AuthModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(authenticate('jwt', { session: false }))
      .forRoutes(
        { path: '/user/*', method: RequestMethod.ALL },
        { path: '/user', method: RequestMethod.ALL },
        { path: '/chat/*', method: RequestMethod.ALL },
        { path: '/chat', method: RequestMethod.ALL },
      );
  }
}
