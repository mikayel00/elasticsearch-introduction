import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { BasePaginationQueryDto } from '../../../common/dtos/base-pagination-query.dto';
import { Transform } from 'class-transformer';

export class GetUserDto extends BasePaginationQueryDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  @Transform(({ value }) => value.trim())
  roleName?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  @Transform(({ value }) => value.trim())
  firstName?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  @Transform(({ value }) => value.trim())
  lastName?: string;
}
