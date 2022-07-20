import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { GenderTypes } from '../models/user.model';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  firstName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  lastName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  username: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  @IsDefined()
  email: string;

  @ApiProperty({ enum: GenderTypes })
  @IsEnum(GenderTypes)
  @IsNotEmpty()
  @IsDefined()
  gender: GenderTypes;

  @ApiProperty()
  @IsPhoneNumber('IT')
  @IsNotEmpty()
  @IsDefined()
  phone: string;

  @ApiProperty()
  @IsString({ message: 'Please enter a valid password for this user' })
  @IsDefined()
  @IsNotEmpty()
  password: string;
}

export const createUserExampleRequest: CreateUserDto = {
  firstName: 'Charles',
  lastName: 'Omoregie',
  username: 'charlieboy',
  email: 'charles081889@gmail.com',
  phone: '+2348170028831',
  gender: GenderTypes.MALE,
  password: 'password',
};
