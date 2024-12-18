import {
  IsArray,
  IsDateString,
  IsEmail,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  @ApiPropertyOptional({
    example: 'user@purrweb.com',
    description: 'User email',
  })
  email?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ example: 'John', description: 'User first name' })
  firstName?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ example: 'Doe', description: 'User last name' })
  lastName?: string;

  @IsDateString()
  @IsOptional()
  @ApiPropertyOptional({
    example: '1968-04-21',
    description: 'User date of birth',
  })
  dateOfBirth?: Date;

  @IsUUID()
  @IsOptional()
  @ApiPropertyOptional()
  roleId?: string;

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
