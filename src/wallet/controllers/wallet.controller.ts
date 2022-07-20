import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthUser } from 'src/user/decorators/auth-user.decorator';
import { UserAuthGuard } from 'src/user/guards/user.guard';
import { UserModel } from 'src/user/models/user.model';
import { WalletService } from '../services/wallet.service';

@ApiTags('Wallet')
@UseGuards(UserAuthGuard)
@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @ApiOperation({
    summary: 'Retrieve user wallet',
  })
  @ApiBearerAuth()
  @Get('')
  async getUserWallet(@AuthUser() user: UserModel) {
    return this.walletService.getUserWallet(user);
  }
}
