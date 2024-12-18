import { ApiProperty } from '@nestjs/swagger';
import { BasePaginationQueryDto } from './base-pagination-query.dto';
import { PaginatedResultsInterface } from '../interfaces';

export abstract class PaginatedResponseDto<T extends Record<string, any>>
  implements PaginatedResultsInterface<T>
{
  data: T[];

  @ApiProperty({ type: BasePaginationQueryDto })
  meta: BasePaginationQueryDto;
}
