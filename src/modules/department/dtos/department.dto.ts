import { IsDate, IsDefined, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { DepartmentEntity } from '../entities/department.entity';

export class DepartmentDto {
  @IsUUID()
  @IsDefined()
  @ApiProperty()
  id: string;

  @IsDate()
  @IsDefined()
  @ApiProperty({
    description: 'Department created date',
  })
  createdAt: Date;

  @IsDate()
  @IsDefined()
  @ApiProperty({
    description: 'Department updated date',
  })
  updatedAt: Date;

  @IsString()
  @IsDefined()
  @ApiProperty({ example: 'Маркетинг', description: 'Department name' })
  name: string;

  @IsString()
  @IsDefined()
  @ApiProperty({
    example: 'Описание департамента маркетинга',
    description: 'Department description',
  })
  description: string;

  constructor(entity: DepartmentEntity) {
    this.id = entity.id;
    this.createdAt = entity.createdAt;
    this.updatedAt = entity.updatedAt;
    this.name = entity.name;
    this.description = entity.description;
  }
}
