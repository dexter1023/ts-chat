import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { FasadeModule } from 'src/common/fasade/fasade.module';

@Module({
  imports: [FasadeModule],
  providers: [ChatGateway],
})
export class ChatGatewayModule {}
