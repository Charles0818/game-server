import { Module } from '@nestjs/common';
import { DonationService } from './services/donation.service';
import { DonationController } from './controllers/donation.controller';
import { ClubModule } from 'src/club/club.module';
import { WalletModule } from 'src/wallet/wallet.module';

@Module({
  imports: [ClubModule, WalletModule],
  providers: [DonationService],
  controllers: [DonationController],
})
export class DonationModule {}
