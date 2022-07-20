import { Test, TestingModule } from '@nestjs/testing';
import { WalletService } from '../services/wallet.service';
import { WalletController } from './wallet.controller';

describe('WalletController', () => {
  let controller: WalletController;
  const mockWalletService = {};
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WalletService],
      controllers: [WalletController],
    })
      .overrideProvider(WalletService)
      .useValue(mockWalletService)
      .compile();

    controller = module.get<WalletController>(WalletController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
