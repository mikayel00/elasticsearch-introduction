import { IsDate, IsDefined, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RoleEntity } from '../entities/role.entity';
import { RoleRightsInterface } from '../interfaces';

export class RoleDto {
  @IsUUID()
  @IsDefined()
  @ApiProperty()
  id: string;

  @IsDate()
  @IsDefined()
  @ApiProperty({
    description: 'Role created date',
  })
  createdAt: Date;

  @IsDate()
  @IsDefined()
  @ApiProperty({
    description: 'Role updated date',
  })
  updatedAt: Date;

  @IsString()
  @IsDefined()
  @ApiProperty({ example: 'Пользователь', description: 'Role name' })
  name: string;

  @IsString()
  @IsDefined()
  @ApiProperty({
    example: 'Описание роли',
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

  constructor(entity: RoleEntity) {
    this.id = entity.id;
    this.createdAt = entity.createdAt;
    this.updatedAt = entity.updatedAt;
    this.name = entity.name;
    this.description = entity.description;
    this.rights = entity.rights;
  }
}
