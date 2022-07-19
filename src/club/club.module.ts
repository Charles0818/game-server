import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { WalletModule } from 'src/wallet/wallet.module';
import { ClubController } from './controllers/club.controller';
import { ClubService } from './services/club.service';

@Module({
  imports: [WalletModule, UserModule],
  providers: [ClubService],
  controllers: [ClubController],
  exports: [ClubService],
})
export class ClubModule {}
