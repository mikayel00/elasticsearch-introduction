import { IsDefined, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RoleRightsInterface } from '../interfaces';

export class CreateRoleDto {
  @IsString()
  @IsDefined()
  @ApiProperty({ example: 'Пользователь', description: 'Role name' })
  name: string;

  @IsString()
  @IsDefined()
  @ApiProperty({
    example: 'Описание роли пользователя',
    description: 'Role description',
  })
  description: string;

  @IsDefined()
  @ApiProperty({
    example: [{ name: 'Менять данные аккаунта' }],
    description: 'Role rights',
    isArray: true,
  })
  rights: RoleRightsInterface[];
}
