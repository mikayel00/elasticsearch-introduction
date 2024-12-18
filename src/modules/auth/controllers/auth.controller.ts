import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import { AdminSignInDto } from '../dtos/admin-sign-in.dto';
import { AdminSignInResponseDto } from '../dtos/admin-sign-in.response.dto';

@ApiTags('[Authorization Routes]')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @ApiOkResponse({
    type: AdminSignInResponseDto,
    description:
      'Используйте этот запрос, чтоб получить access token для дальнейших запросов как Администратор. Время жизни токена 1 день.',
  })
  @ApiForbiddenResponse({
    description:
      'В базе данных нет админа с такой почтой или неправильно был введен пароль',
  })
  @ApiOperation({
    summary: 'Авторизоваться как администатор используя email и пароль',
  })
  @Post('/admin/sign-in')
  async adminSignIn(
    @Body() body: AdminSignInDto,
  ): Promise<AdminSignInResponseDto> {
    const response = await this.authService.adminSignIn(body);
    return new AdminSignInResponseDto(response.token);
  }
}
