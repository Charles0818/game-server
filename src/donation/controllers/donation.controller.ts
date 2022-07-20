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
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthUser } from '../../user/decorators/auth-user.decorator';
import { UserAuthGuard } from '../../user/guards/user.guard';
import { UserModel } from '../../user/models/user.model';
import { DonationRequestsFilter } from '../dtos/donationRequestsFilter.dto';
import {
  RequestDonationDto,
  requestDonationExample,
} from '../dtos/requestDonation.dto';
import { DonationService } from '../services/donation.service';

@ApiTags('Donations')
@ApiBearerAuth()
@UseGuards(UserAuthGuard)
@Controller('donations')
export class DonationController {
  constructor(private readonly donationService: DonationService) {}

  @ApiOperation({ summary: 'Request donation from members in your club' })
  @ApiBody({
    type: RequestDonationDto,
    examples: {
      value: { summary: 'Donation Request', value: requestDonationExample },
    },
  })
  @Post('club/:clubId')
  async requestDonation(
    @Param('clubId', new ParseUUIDPipe()) clubId: string,
    @Body() body: RequestDonationDto,
    @AuthUser() user: UserModel,
  ) {
    return this.donationService.requestDonation(
      clubId,
      body.softCurrency,
      user,
    );
  }

  @ApiOperation({ summary: 'List club donation requests' })
  @Get('club/:clubId')
  async listClubDonationRequests(
    @Param('clubId', new ParseUUIDPipe()) clubId: string,
    @Query() filter: DonationRequestsFilter,
  ) {
    return this.donationService.listClubDonationRequests(clubId, filter);
  }

  @ApiOperation({ summary: 'Fulfill donation request' })
  @Put(':requestId')
  async fulfillDonationRequest(
    @Param('requestId', new ParseUUIDPipe()) requestId: string,
    @AuthUser() user: UserModel,
  ) {
    return this.donationService.fulfillDonationRequest(requestId, user);
  }

  @ApiOperation({ summary: 'Get a donation request' })
  @Get(':requestId')
  async getDonationRequest(
    @Param('requestId', new ParseUUIDPipe()) requestId: string,
  ) {
    return this.donationService.getDonationRequest(requestId);
  }
}
