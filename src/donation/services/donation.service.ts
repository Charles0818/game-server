import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ClubService } from '../../club/services/club.service';
import { UserModel } from '../../user/models/user.model';
import { getPaginationParams } from '../../utilities/pagination';
import { SuccessResponse } from '../../utilities/succcessResponse';
import { WalletModel } from '../../wallet/models/wallet.model';
import { WalletService } from '../../wallet/services/wallet.service';
import { EntityManager } from 'typeorm';
import { DonationRequestsFilter } from '../dtos/donationRequestsFilter.dto';
import { DonationRequestsModel } from '../models/donationRequests.model';

@Injectable()
export class DonationService {
  constructor(
    private readonly manager: EntityManager,
    private readonly clubService: ClubService,
    private readonly walletService: WalletService,
  ) {}

  async requestDonation(
    clubId: string,
    softCurrencyAmount: number,
    user: UserModel,
  ) {
    try {
      const userWallet = await this.manager.findOne(WalletModel, {
        where: { user: user.id },
      });
      if (!userWallet)
        throw new NotFoundException(
          'You do not have any wallet assigned to your account',
        );
      const club = await this.clubService.getClubById(clubId);
      await this.clubService.checkIfUserIsClubMember(user, club);
      const hasUnfulfilledRequest = await this.manager.findOne(
        DonationRequestsModel,
        { where: { issuer: user.id, club: club.id, fulfilled: false } },
      );
      if (hasUnfulfilledRequest)
        throw new ForbiddenException(
          'You currently have a pending donation request',
        );
      const requestInstance = new DonationRequestsModel({
        issuer: user,
        club,
        softCurrency: softCurrencyAmount,
      });
      const request = await this.manager.save(requestInstance);
      return new SuccessResponse(
        'You have successfully submitted your donation request',
        request,
      );
    } catch (error) {
      throw error;
    }
  }

  async fulfillDonationRequest(requestId: string, user: UserModel) {
    const connection = this.manager.connection;
    const queryRunner = connection.createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
      const donationRequest = await this.getDonationRequestById(requestId);
      if (donationRequest.fulfilled)
        throw new BadRequestException('Donation request already fulfilled');
      if (donationRequest.issuer.id === user.id)
        throw new ForbiddenException('Issuer is same as the donor');
      await this.walletService.transactCurrency(
        donationRequest.softCurrency,
        'softCurrency',
        user,
        donationRequest.issuer,
      );
      donationRequest.fulfilled = true;
      donationRequest.donor = user;
      await queryRunner.manager.save(donationRequest);
      await queryRunner.commitTransaction();
      return new SuccessResponse('Donation successful');
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async getDonationRequest(requestId: string) {
    try {
      const donationRequest = await this.getDonationRequestById(requestId);
      return new SuccessResponse(
        'Donation request fetched successfully',
        donationRequest,
      );
    } catch (error) {
      throw error;
    }
  }

  async listClubDonationRequests(
    clubId: string,
    filter?: DonationRequestsFilter,
  ) {
    try {
      const { skip, limit, page } = getPaginationParams({
        page: filter?.page,
        size: filter?.size,
      });
      const where: any = { club: clubId };
      if (filter.fulfilled)
        where.fulfilled = filter.fulfilled === 'true' ? true : false;
      const [clubDonationLists, count] = await this.manager.findAndCount(
        DonationRequestsModel,
        {
          where,
          relations: ['issuer', 'donor'],
          take: limit,
          skip,
        },
      );
      const pagination = {
        totalRequests: count,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      };

      const data = { pagination, list: clubDonationLists };

      return new SuccessResponse(
        'Club donation requests listed successfully',
        data,
      );
    } catch (error) {
      throw error;
    }
  }

  private async getDonationRequestById(requestId: string) {
    const donationRequest = await this.manager.findOne(DonationRequestsModel, {
      where: { id: requestId },
      relations: ['issuer'],
    });
    if (!donationRequest)
      throw new NotFoundException('Donation request not found');
    return donationRequest;
  }
}
