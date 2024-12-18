import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateDepartmentDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ example: 'Маркетинг', description: 'Department name' })
  name?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    example: 'Описание департамента маркетинга',
    description: 'Department description',
  })
  description?: string;
}
