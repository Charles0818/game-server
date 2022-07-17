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
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  @IsDefined()
  email: string;

  @IsEnum(GenderTypes)
  @IsNotEmpty()
  @IsDefined()
  gender: GenderTypes;

  @IsPhoneNumber('IT')
  @IsNotEmpty()
  @IsDefined()
  phone: string;

  @IsString({ message: 'Please enter a valid password for this user' })
  @IsDefined()
  @IsNotEmpty()
  password: string;
}
