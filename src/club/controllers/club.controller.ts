import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthUser } from '../../user/decorators/auth-user.decorator';
import { UserAuthGuard } from '../../user/guards/user.guard';
import { UserModel } from '../../user/models/user.model';
import { PaginationFilterDto } from '../../utilities/pagination';
import { CreateClubDto, createClubExample } from '../dtos/createClub.dto';
import { SendMessageDto, sendMessageExample } from '../dtos/sendMessage.dto';
import { ClubService } from '../services/club.service';

@ApiTags('Clubs')
@ApiBearerAuth()
@UseGuards(UserAuthGuard)
@Controller('clubs')
export class ClubController {
  constructor(private readonly clubService: ClubService) {}

  @ApiOperation({ summary: 'Create club' })
  @ApiBody({
    type: CreateClubDto,
    description: 'Create club',
    examples: { value: { summary: 'Club', value: createClubExample } },
  })
  @Post('')
  async createClub(
    @Body() createClubInput: CreateClubDto,
    @AuthUser() user: UserModel,
  ) {
    return this.clubService.createClub(user, createClubInput);
  }

  @ApiOperation({
    summary: "List all clubs (includes clubs you're yet to join",
  })
  @Get('')
  async listClubs() {
    return this.clubService.listClubs();
  }

  @ApiOperation({ summary: 'Join a club' })
  @Post(':id/join')
  async joinClub(
    @Param('id', new ParseUUIDPipe()) clubId: string,
    @AuthUser() user: UserModel,
  ) {
    return this.clubService.joinClub(user, clubId);
  }

  @ApiOperation({ summary: 'Get a club' })
  @Get(':id')
  async getClub(@Param('id', new ParseUUIDPipe()) clubId: string) {
    return this.clubService.getClub(clubId);
  }

  @ApiOperation({ summary: 'Send message to your club' })
  @ApiBody({
    type: SendMessageDto,
    description: 'Send message to your club',
    examples: { value: { summary: 'Message', value: sendMessageExample } },
  })
  @Post(':id/message')
  async sendMessage(
    @AuthUser() user: UserModel,
    @Param('id', new ParseUUIDPipe()) clubId: string,
    @Body() body: SendMessageDto,
  ) {
    return this.clubService.sendMessage(clubId, body, user);
  }

  @ApiOperation({ summary: 'Get club messages' })
  @Get(':id/messages')
  async getClubMessages(
    @Param('id', new ParseUUIDPipe()) clubId: string,
    @Query() pagination: PaginationFilterDto,
    @AuthUser() user: UserModel,
  ) {
    return this.clubService.getClubMessages(clubId, user, pagination);
  }
}
