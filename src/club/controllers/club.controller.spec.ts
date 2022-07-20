import { Test, TestingModule } from '@nestjs/testing';
import { ClubService } from '../services/club.service';
import { ClubController } from './club.controller';

describe('ClubController', () => {
  let controller: ClubController;
  const mockClubService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClubService],
      controllers: [ClubController],
    })
      .overrideProvider(ClubService)
      .useValue(mockClubService)
      .compile();

    controller = module.get<ClubController>(ClubController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
