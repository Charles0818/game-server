import { Test, TestingModule } from '@nestjs/testing';
import { getEntityManagerToken } from '@nestjs/typeorm';
import { ClubService } from '../../club/services/club.service';
import { WalletService } from '../../wallet/services/wallet.service';
import { DonationService } from './donation.service';

describe('DonationService', () => {
  let service: DonationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DonationService,
        { provide: getEntityManagerToken(), useValue: {} },
        { provide: ClubService, useValue: {} },
        { provide: WalletService, useValue: {} },
      ],
    }).compile();

    service = module.get<DonationService>(DonationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
