import { IsEnum, IsInt, IsOptional, Min } from 'class-validator';
import { SortOrder } from '../types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class BasePaginationQueryDto {
  @IsOptional()
  @Transform((value) => Number(value.value))
  @IsInt()
  @Min(1)
  @ApiPropertyOptional({ nullable: true, default: 1 })
  page: number;

  @IsOptional()
  @Transform((value) => Number(value.value))
  @IsInt()
  @Min(1)
  @ApiPropertyOptional({ nullable: true, default: 20 })
  limit: number;

  @IsOptional()
  @IsEnum(SortOrder)
  @ApiPropertyOptional({ nullable: true, default: SortOrder.ASC })
  order?: SortOrder;
}
