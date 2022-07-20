import { Test, TestingModule } from '@nestjs/testing';
import { DonationService } from '../services/donation.service';
import { DonationController } from './donation.controller';

describe('DonationController', () => {
  let controller: DonationController;
  const mockDonationService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DonationService],
      controllers: [DonationController],
    })
      .overrideProvider(DonationService)
      .useValue(mockDonationService)
      .compile();

    controller = module.get<DonationController>(DonationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
