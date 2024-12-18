import { IsDefined, IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class AdminSignInDto {
  @IsDefined()
  @IsEmail()
  @ApiProperty({ example: 'admin@email.com', description: 'Admin email' })
  @Transform(({ value }) => value.toLowerCase())
  email: string;

  @IsDefined()
  @IsString()
  @ApiProperty({ example: '12345678', description: 'Admin password' })
  password: string;
}
