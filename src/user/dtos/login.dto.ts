import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  identity: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  password: string;
}

export const loginExampleRequest: LoginDto = {
  identity: 'admin@whatwapp.com',
  password: 'password',
};
