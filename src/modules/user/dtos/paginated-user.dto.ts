import { PaginatedResponseDto } from '../../../common/dtos/paginated-response.dto';
import { UserDto } from './user.dto';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class PaginatedUserDto extends PaginatedResponseDto<UserDto> {
  @ApiProperty({ type: UserDto, isArray: true })
  @Expose()
  data: UserDto[];
}
