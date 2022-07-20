import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthUser } from 'src/user/decorators/auth-user.decorator';
import { UserAuthGuard } from 'src/user/guards/user.guard';
import { UserModel } from 'src/user/models/user.model';
import { DonationRequestsFilter } from '../dtos/donationRequestsFilter.dto';
import { RequestDonationDto } from '../dtos/requestDonation.dto';
import { DonationService } from '../services/donation.service';

@UseGuards(UserAuthGuard)
@Controller('donations')
export class DonationController {
  constructor(private readonly donationService: DonationService) {}

  @Post('')
  async requestDonation(
    @Body() body: RequestDonationDto,
    @AuthUser() user: UserModel,
  ) {
    return this.donationService.requestDonation(
      body.clubId,
      body.softCurrency,
      user,
    );
  }

  @Get('club/:clubId')
  async listClubDonationRequests(
    @Param('clubId', new ParseUUIDPipe()) clubId: string,
    @Query() filter: DonationRequestsFilter,
  ) {
    return this.donationService.listClubDonationRequests(clubId, filter);
  }

  @Put(':requestId')
  async fulfillDonationRequest(
    @Param('requestId', new ParseUUIDPipe()) requestId: string,
    @AuthUser() user: UserModel,
  ) {
    return this.donationService.fulfillDonationRequest(requestId, user);
  }

  @Get(':requestId')
  async getDonationRequest(
    @Param('requestId', new ParseUUIDPipe()) requestId: string,
  ) {
    return this.donationService.getDonationRequest(requestId);
  }
}
