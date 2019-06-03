import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatSchema } from './schemas/chat.shema'
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Chat', schema: ChatSchema}])],
  controllers: [ChatController],
  providers: [ChatService]
})
export class ChatModule {}
