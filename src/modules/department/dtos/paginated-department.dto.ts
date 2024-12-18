import { PaginatedResponseDto } from '../../../common/dtos/paginated-response.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { DepartmentDto } from './department.dto';

export class PaginatedDepartmentDto extends PaginatedResponseDto<DepartmentDto> {
  @ApiProperty({ type: DepartmentDto, isArray: true })
  @Expose()
  data: DepartmentDto[];
}
