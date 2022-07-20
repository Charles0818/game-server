import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { JwtService } from '@nestjs/jwt';
import { EventConstants } from '../../utilities/eventConstants';
import { SuccessResponse } from '../../utilities/succcessResponse';
import { EntityManager } from 'typeorm';
import { CreateUserDto } from '../dtos/createUser.dto';
import { LoginDto } from '../dtos/login.dto';
import { UserModel } from '../models/user.model';
import * as bcrypt from 'bcrypt';
import { adminUser } from '../data/adminUser.seeder';

@Injectable()
export class UserService {
  constructor(
    private readonly manager: EntityManager,
    private readonly eventEmitter2: EventEmitter2,
    private jwtService: JwtService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    try {
      await this.validateNewUserCredentials(createUserDto);
      createUserDto.password = await this.hashPassword(createUserDto.password);
      const newUser = this.manager.create(UserModel, {
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
        email: createUserDto.email,
        phone: createUserDto.phone,
        username: createUserDto.username,
        gender: createUserDto.gender,
        password: createUserDto.password,
      });
      const user = await this.manager.save(newUser);
      delete user.password;
      this.eventEmitter2.emit(EventConstants.USER_CREATED, user);
      return new SuccessResponse('Account created successfully', user);
    } catch (error) {
      throw error;
    }
  }

  async login(loginDto: LoginDto) {
    try {
      const user = await this.manager
        .createQueryBuilder(UserModel, 'user')
        .where('user.email = :identity', { identity: loginDto.identity })
        .orWhere('user.phone = :identity', { identity: loginDto.identity })
        .orWhere('user.username = :identity', { identity: loginDto.identity })
        .addSelect('user.password')
        .getOne();
      if (!user) throw new BadRequestException('Invalid login credentials');
      const passwordIsValid = await this.matchesHash(
        loginDto.password,
        user?.password,
      );
      if (!passwordIsValid)
        throw new BadRequestException('Invalid login credentials');
      delete user.password;
      const token = this.jwtService.sign({ user });
      return new SuccessResponse('You have successfully logged in', {
        token,
        user,
      });
    } catch (error) {
      throw error;
    }
  }

  async getUser(user: UserModel) {
    const userInfo = await this.manager.findOne(UserModel, {
      where: { id: user.id },
    });
    if (!userInfo) throw new NotFoundException('User not found');
    return new SuccessResponse('User successfully retrieved', userInfo);
  }

  private async validateNewUserCredentials(createUserDto: CreateUserDto) {
    const emailOrPhoneExists = await this.manager.findOne(UserModel, {
      where: [
        { email: createUserDto.email },
        { phone: createUserDto.phone },
        { username: createUserDto.username },
      ],
    });
    if (emailOrPhoneExists)
      throw new UnprocessableEntityException(
        'Email or phone number already exists',
      );
  }

  async getAdminAccount() {
    const admin = await this.manager.findOne(UserModel, {
      where: { email: adminUser.email },
    });
    return admin;
  }

  async matchesHash(plainPassword: string, hash: string): Promise<boolean> {
    return bcrypt.compareSync(plainPassword, hash);
  }

  async hashPassword(plainPassword: string): Promise<string> {
    return bcrypt.hashSync(plainPassword, 11);
  }
}
