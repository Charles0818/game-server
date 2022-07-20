import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class PaginationFilterDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  page?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  size?: number;
}

export const getPaginationParams = (params: PaginationFilterDto) => {
  const { page: requestedPage, size } = params;
  const limit = size || 20;

  const page = requestedPage ? parseInt(requestedPage) : 1;
  const skip = (page - 1) * limit;

  return { limit, skip, page };
};
