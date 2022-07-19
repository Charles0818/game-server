import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserModel } from 'src/user/models/user.model';
import { UserService } from 'src/user/services/user.service';
import {
  getPaginationParams,
  PaginationFilterDto,
} from 'src/utilities/pagination';
import { SuccessResponse } from 'src/utilities/succcessResponse';
import { WalletService } from 'src/wallet/services/wallet.service';
import { EntityManager, getConnection } from 'typeorm';
import { CreateClubDto } from '../dtos/createClub.dto';
import { SendMessageDto } from '../dtos/sendMessage.dto';
import { ClubMessageModel } from '../models/clubMessages.model';
import { ClubModel } from '../models/clubs.model';
import { UserClubModel } from '../models/userClub.model';

@Injectable()
export class ClubService {
  constructor(
    private readonly manager: EntityManager,
    private readonly walletService: WalletService,
    private readonly userService: UserService,
  ) {}

  async createClub(user: UserModel, createClubInput: CreateClubDto) {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();

    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
      const admin = await this.userService.getAdminAccount();
      await this.walletService.transactCurrency(
        50,
        'hardCurrency',
        user,
        admin,
      );
      const clubInstance = queryRunner.manager.create(ClubModel, {
        name: createClubInput.name,
        owner: user,
        maxMembers: createClubInput.maxMembers,
      });

      const club = await queryRunner.manager.save(clubInstance);
      const userClubInstance = queryRunner.manager.create(UserClubModel, {
        club,
        user,
      });
      await queryRunner.manager.save(userClubInstance);
      await queryRunner.commitTransaction();
      return new SuccessResponse('Club created successfully', club);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async joinClub(user: UserModel, clubId: string) {
    try {
      const club = await this.manager.findOne(ClubModel, {
        where: { id: clubId },
      });
      if (!club) throw new NotFoundException('This club does not exist');
      const clubUsersCount = await this.manager.count(UserClubModel, {
        where: { club: club.id },
      });
      if (clubUsersCount >= club.maxMembers)
        throw new ForbiddenException(
          'Maximum members for this club has been reached',
        );
      const isExistingMember = await this.manager.findOne(UserClubModel, {
        where: { club: club.id, user: user.id },
      });
      if (isExistingMember)
        throw new ForbiddenException('You are already a member of this club');
      const admin = await this.userService.getAdminAccount();
      await this.walletService.transactCurrency(
        100,
        'softCurrency',
        user,
        admin,
      );
      const userClubInstance = this.manager.create(UserClubModel, {
        user,
        club,
      });
      const userClub = await this.manager.save(userClubInstance);
      return new SuccessResponse('You have successfully joined', userClub);
    } catch (error) {
      throw error;
    }
  }

  async getClub(clubId: string) {
    try {
      const club = await this.getClubById(clubId);
      return new SuccessResponse('Club successfully retrieved', club);
    } catch (error) {
      throw error;
    }
  }

  async getClubById(clubId: string) {
    const club = await this.manager.findOne(ClubModel, {
      where: { id: clubId },
      relations: ['owner', 'users'],
    });
    if (!club) throw new NotFoundException('Club not found');
    return club;
  }

  async checkIfUserIsClubMember(user: UserModel, club: ClubModel) {
    const userClub = await this.manager.findOne(UserClubModel, {
      where: { user: user.id, club: club.id },
    });
    if (!userClub)
      throw new UnauthorizedException('You are not yet a memeber of this club');
    return userClub;
  }

  async listClubs() {
    try {
      const clubs = await this.manager.find(ClubModel);
      return new SuccessResponse('Club lists fetched successfully', clubs);
    } catch (error) {
      throw error;
    }
  }

  async sendMessage(
    clubId: string,
    sendMessageInput: SendMessageDto,
    user: UserModel,
  ) {
    try {
      const club = await this.getClubById(clubId);
      await this.checkIfUserIsClubMember(user, club);
      const messageInstance = this.manager.create(ClubMessageModel, {
        club,
        author: user,
        message: sendMessageInput.message,
      });
      const message = await this.manager.save(messageInstance);
      return new SuccessResponse('Message successfully sent', message);
    } catch (error) {
      throw error;
    }
  }

  async getClubMessages(
    clubId: string,
    user: UserModel,
    pagination?: PaginationFilterDto,
  ) {
    try {
      const { limit, skip, page } = getPaginationParams({
        page: pagination.page,
        size: pagination.size,
      });
      const club = await this.getClubById(clubId);
      await this.checkIfUserIsClubMember(user, club);
      const [messages, count] = await this.manager.findAndCount(
        ClubMessageModel,
        {
          where: { club: club.id },
          take: limit,
          skip,
        },
      );
      const paginationProps = {
        totalMessages: count,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      };

      const data = { pagination: paginationProps, messages };
      return new SuccessResponse('Messages retrieved successfully', data);
    } catch (error) {
      throw error;
    }
  }
}
