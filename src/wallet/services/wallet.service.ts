import { Injectable, NotFoundException } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UserModel } from 'src/user/models/user.model';
import { EventConstants } from 'src/utilities/eventConstants';
import { SuccessResponse } from 'src/utilities/succcessResponse';
import { EntityManager } from 'typeorm';
import { WalletModel } from '../models/wallet.model';

@Injectable()
export class WalletService {
  constructor(private manager: EntityManager) {}

  @OnEvent(EventConstants.USER_CREATED)
  async createWalletForNewUser(user: UserModel) {
    const walletInstance = this.manager.create(WalletModel, {
      user,
      softCurrency: this.addCurrency(10, 1000),
      hardCurrency: this.addCurrency(5, 100),
    });
    await this.manager.save(walletInstance);
  }

  private addCurrency(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  async getUserWallet(user: UserModel) {
    try {
      const wallet = await this.manager.findOne(WalletModel, {
        where: { user: user.id },
      });
      if (!wallet) throw new NotFoundException('Wallet not found');
      return new SuccessResponse('Wallet successfully retrieved', wallet);
    } catch (error) {
      throw error;
    }
  }
}
