import { IsDefined, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDepartmentDto {
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
}
