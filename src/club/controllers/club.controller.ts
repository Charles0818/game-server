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
import { AuthUser } from 'src/user/decorators/auth-user.decorator';
import { UserAuthGuard } from 'src/user/guards/user.guard';
import { UserModel } from 'src/user/models/user.model';
import { PaginationFilterDto } from 'src/utilities/pagination';
import { CreateClubDto } from '../dtos/createClub.dto';
import { SendMessageDto } from '../dtos/sendMessage.dto';
import { ClubService } from '../services/club.service';

@UseGuards(UserAuthGuard)
@Controller('clubs')
export class ClubController {
  constructor(private readonly clubService: ClubService) {}

  @Post('')
  async createClub(
    @Body() createClubInput: CreateClubDto,
    @AuthUser() user: UserModel,
  ) {
    return this.clubService.createClub(user, createClubInput);
  }

  @Get('')
  async listClubs() {
    return this.clubService.listClubs();
  }

  @Post(':id/join')
  async joinClub(
    @Param('id', new ParseUUIDPipe()) clubId: string,
    @AuthUser() user: UserModel,
  ) {
    return this.clubService.joinClub(user, clubId);
  }

  @Get(':id')
  async getClub(@Param('id', new ParseUUIDPipe()) clubId: string) {
    return this.clubService.getClub(clubId);
  }

  @Post(':id/message')
  async sendMessage(
    @AuthUser() user: UserModel,
    @Param('id', new ParseUUIDPipe()) clubId: string,
    @Body() body: SendMessageDto,
  ) {
    return this.clubService.sendMessage(clubId, body, user);
  }

  @Get(':id/messages')
  async getClubMessages(
    @Param('id', new ParseUUIDPipe()) clubId: string,
    @Query() pagination: PaginationFilterDto,
    @AuthUser() user: UserModel,
  ) {
    return this.clubService.getClubMessages(clubId, user, pagination);
  }
}
