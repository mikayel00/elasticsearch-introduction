import {
  IsArray,
  IsDateString,
  IsDefined,
  IsEmail,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @IsEmail()
  @IsDefined()
  @ApiProperty({ example: 'user@purrweb.com', description: 'User email' })
  email: string;

  @IsString()
  @IsDefined()
  @ApiProperty({ example: 'John', description: 'User first name' })
  firstName: string;

  @IsString()
  @IsDefined()
  @ApiProperty({ example: 'Doe', description: 'User last name' })
  lastName: string;

  @IsDateString()
  @IsDefined()
  @ApiProperty({ example: '1968-04-21', description: 'User date of birth' })
  dateOfBirth: Date;

  @IsUUID()
  @IsDefined()
  @ApiProperty({ example: '8dad10b1-b6f1-40f0-9859-7c9a29c579b3' })
  roleId: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    example:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1024px-Default_pfp.svg.png',
    description: 'User avatar url key',
  })
  avatarUrl?: string;

  @IsArray()
  @IsOptional()
  @ApiPropertyOptional({
    example: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1024px-Default_pfp.svg.png',
    ],
    description: 'User documents keys',
    isArray: true,
  })
  documents?: string[];

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    example:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet neque purus.',
    description: 'User additional information',
  })
  additionalInformation?: string;
}
