import { Module } from '@nestjs/common';
import { DonationService } from './services/donation.service';
import { DonationController } from './controllers/donation.controller';
import { ClubModule } from '../club/club.module';
import { WalletModule } from '../wallet/wallet.module';

@Module({
  imports: [ClubModule, WalletModule],
  providers: [DonationService],
  controllers: [DonationController],
})
export class DonationModule {}
