import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthUser } from 'src/user/decorators/auth-user.decorator';
import { UserAuthGuard } from 'src/user/guards/user.guard';
import { UserModel } from 'src/user/models/user.model';
import { WalletService } from '../services/wallet.service';

@UseGuards(UserAuthGuard)
@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Get('')
  async getUser(@AuthUser() user: UserModel) {
    return this.walletService.getUserWallet(user);
  }
}
