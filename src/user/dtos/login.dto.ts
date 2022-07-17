import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  identity: string;

  @IsDefined()
  @IsNotEmpty()
  password: string;
}
