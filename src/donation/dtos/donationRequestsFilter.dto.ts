import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { PaginationFilterDto } from 'src/utilities/pagination';

export class DonationRequestsFilter extends PaginationFilterDto {
  @ApiPropertyOptional({ enum: ['true', 'false'] })
  @IsOptional()
  @IsEnum(['true', 'false'])
  fulfilled: string;
}
