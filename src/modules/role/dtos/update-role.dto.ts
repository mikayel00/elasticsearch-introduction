import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { RoleRightsInterface } from '../interfaces';

export class UpdateRoleDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ example: 'Пользователь', description: 'Role name' })
  name?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    example: 'Описание роли пользователя',
    description: 'Role description',
  })
  description?: string;

  @IsOptional()
  @ApiPropertyOptional({
    example: [{ name: 'Менять данные аккаунта' }],
    description: 'Role rights',
    isArray: true,
  })
  rights?: RoleRightsInterface[];
}
