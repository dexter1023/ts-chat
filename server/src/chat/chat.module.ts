import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatSchema } from './schemas/chat.shema';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { MessageModule } from 'src/message/message.module';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Chat', schema: ChatSchema}]), MessageModule],
  controllers: [ChatController],
  providers: [ChatService],
  exports: [ChatService],
})
export class ChatModule {}
