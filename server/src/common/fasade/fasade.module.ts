import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { MessageModule } from 'src/message/message.module';
import { AuthModule } from 'src/auth/auth.module';
import { FasadeService } from './fasade.service';

@Module({
  imports: [UserModule, MessageModule, AuthModule],
  providers: [FasadeService],
  exports: [FasadeService],
})
export class FasadeModule {}
