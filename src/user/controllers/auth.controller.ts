import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../dtos/createUser.dto';
import { LoginDto } from '../dtos/login.dto';
import { UserService } from '../services/user.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async createUser(@Body() body: CreateUserDto) {
    return this.userService.createUser(body);
  }

  @Post('login')
  async login(@Body() body: LoginDto) {
    return this.userService.login(body);
  }
}
