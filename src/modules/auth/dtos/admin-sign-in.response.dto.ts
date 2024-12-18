import { IsDefined, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AdminSignInResponseDto {
  @IsDefined()
  @IsString()
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1...',
    description: 'Токен, который нужно использовать в запросах',
  })
  accessToken: string;

  constructor(token: string) {
    this.accessToken = token;
  }
}
