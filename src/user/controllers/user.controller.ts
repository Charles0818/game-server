import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthUser } from '../decorators/auth-user.decorator';
import { UserAuthGuard } from '../guards/user.guard';
import { UserModel } from '../models/user.model';
import { UserService } from '../services/user.service';

@UseGuards(UserAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('')
  async getUser(@AuthUser() user: UserModel) {
    return this.userService.getUser(user);
  }
}
