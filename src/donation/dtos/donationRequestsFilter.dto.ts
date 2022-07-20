import { IsEnum, IsOptional } from 'class-validator';
import { PaginationFilterDto } from 'src/utilities/pagination';

export class DonationRequestsFilter extends PaginationFilterDto {
  @IsOptional()
  @IsEnum(['true', 'false'])
  fulfilled: string;
}
