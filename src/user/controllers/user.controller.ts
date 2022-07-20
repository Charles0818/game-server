import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthUser } from '../decorators/auth-user.decorator';
import { UserAuthGuard } from '../guards/user.guard';
import { UserModel } from '../models/user.model';
import { UserService } from '../services/user.service';

@ApiTags('User')
@UseGuards(UserAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: 'Retrieve user account information',
  })
  @ApiBearerAuth()
  @Get('')
  async getUser(@AuthUser() user: UserModel) {
    return this.userService.getUser(user);
  }
}
