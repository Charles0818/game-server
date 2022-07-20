import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { WalletModule } from '../wallet/wallet.module';
import { ClubController } from './controllers/club.controller';
import { ClubService } from './services/club.service';

@Module({
  imports: [WalletModule, UserModule],
  providers: [ClubService],
  controllers: [ClubController],
  exports: [ClubService],
})
export class ClubModule {}
