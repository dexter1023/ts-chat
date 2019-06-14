import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageSchema } from './schemas/message.schema';
import { MessageService } from './message.service';
import { UserModule } from 'src/user/user.module';
import { MessageController } from './message.controller';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Message', schema: MessageSchema}]), UserModule],
  controllers: [MessageController],
  providers: [MessageService],
  exports: [MessageService],
})

export class MessageModule {}
