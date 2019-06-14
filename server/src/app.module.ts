import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatModule } from './chat/chat.module';
import { MessageModule } from './message/message.module';
import { ChatGatewayModule } from './chat-gateway/chat.gateway.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import * as config from './config/config.json';

@Module({
  imports: [
    MongooseModule.forRoot(config[process.env.NODE_ENV].db.url),
    ChatModule,
    MessageModule,
    ChatGatewayModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
