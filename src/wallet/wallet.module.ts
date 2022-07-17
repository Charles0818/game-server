import { Module } from '@nestjs/common';
import { WalletService } from './services/wallet.service';
import { WalletController } from './controllers/wallet.controller';

@Module({
  providers: [WalletService],
  controllers: [WalletController],
})
export class WalletModule {}
