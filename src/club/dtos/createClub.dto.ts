import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDefined,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
export class CreateClubDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  name: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @IsNotEmpty()
  @IsDefined()
  maxMembers?: number;
}

export const createClubExample: CreateClubDto = {
  name: 'Whatwapp',
  maxMembers: 100,
};
