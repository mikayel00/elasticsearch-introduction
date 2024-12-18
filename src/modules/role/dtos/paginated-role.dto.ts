import { PaginatedResponseDto } from '../../../common/dtos/paginated-response.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { RoleDto } from './role.dto';

export class PaginatedRoleDto extends PaginatedResponseDto<RoleDto> {
  @ApiProperty({ type: RoleDto, isArray: true })
  @Expose()
  data: RoleDto[];
}
