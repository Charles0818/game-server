import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsNumber } from 'class-validator';

export class RequestDonationDto {
  @ApiProperty()
  @IsNumber()
  @IsDefined()
  @IsNotEmpty()
  softCurrency: number;
}

export const requestDonationExample: RequestDonationDto = {
  softCurrency: 10,
};
