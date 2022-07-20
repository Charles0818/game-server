import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  CreateUserDto,
  createUserExampleRequest,
} from '../dtos/createUser.dto';
import { LoginDto, loginExampleRequest } from '../dtos/login.dto';
import { UserService } from '../services/user.service';

@ApiTags('User authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: 'Account registration',
  })
  @ApiBody({
    type: CreateUserDto,
    description: 'Create user account',
    examples: {
      value: {
        description: 'An example of the request body expectation',
        summary: 'Create User',
        value: createUserExampleRequest,
      },
    },
  })
  @Post('signup')
  async createUser(@Body() body: CreateUserDto) {
    return this.userService.createUser(body);
  }

  @ApiOperation({
    summary: 'User login',
  })
  @ApiBody({
    type: LoginDto,
    description: 'Account login',
    examples: {
      value: {
        description: 'identity can either be your email, phone or username',
        summary: 'Admin login credentials',
        value: loginExampleRequest,
      },
    },
  })
  @Post('login')
  async login(@Body() body: LoginDto) {
    return this.userService.login(body);
  }
}
