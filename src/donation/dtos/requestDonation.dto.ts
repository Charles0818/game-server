import { IsDefined, IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class RequestDonationDto {
  @IsUUID()
  @IsDefined()
  @IsNotEmpty()
  clubId: string;

  @IsNumber()
  @IsDefined()
  @IsNotEmpty()
  softCurrency: number;
}
