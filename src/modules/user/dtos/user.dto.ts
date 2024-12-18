import {
  IsDate,
  IsDateString,
  IsDefined,
  IsEmail,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserEntity } from '../entities/user.entity';

export class UserDto {
  @IsUUID()
  @IsDefined()
  @ApiProperty()
  id: string;

  @IsDate()
  @IsDefined()
  @ApiProperty({
    description: 'User created date',
  })
  createdAt: Date;

  @IsDate()
  @IsDefined()
  @ApiProperty({
    description: 'User updated date',
  })
  updatedAt: Date;

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
  @ApiProperty()
  roleId: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    example:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1024px-Default_pfp.svg.png',
    description: 'User avatar url key',
  })
  avatarUrl?: string;

  @IsString()
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

  constructor(entity: UserEntity) {
    this.id = entity.id;
    this.createdAt = entity.createdAt;
    this.updatedAt = entity.updatedAt;
    this.email = entity.email;
    this.firstName = entity.firstName;
    this.lastName = entity.lastName;
    this.dateOfBirth = entity.dateOfBirth;
    this.roleId = entity.roleId;
    this.avatarUrl = entity.avatarUrl;
    this.documents = entity.documents;
    this.additionalInformation = entity.additionalInformation;
  }
}
