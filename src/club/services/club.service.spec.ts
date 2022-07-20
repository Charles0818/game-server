import { Test, TestingModule } from '@nestjs/testing';
import { getEntityManagerToken } from '@nestjs/typeorm';
import { WalletService } from '../../wallet/services/wallet.service';
import { EntityManager } from 'typeorm';
import { ClubService } from './club.service';
import { UserService } from '../../user/services/user.service';

describe('ClubService', () => {
  let service: ClubService;
  const mockManagerFactory = {};
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClubService,
        {
          provide: getEntityManagerToken(),
          useValue: mockManagerFactory,
        },
        { provide: WalletService, useValue: {} },
        { provide: UserService, useValue: {} },
      ],
    }).compile();

    service = module.get<ClubService>(ClubService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
