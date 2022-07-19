import {
  IsDefined,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
export class CreateClubDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  name: string;

  @IsOptional()
  @IsInt()
  @IsNotEmpty()
  @IsDefined()
  maxMembers: number;
}
