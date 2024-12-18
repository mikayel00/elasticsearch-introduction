import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiAcceptedResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UserService } from '../services/user.service';
import { UserDto } from '../dtos/user.dto';
import { CreateUserDto } from '../dtos/create-user.dto';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { ParseUUID } from '../../../common/pipes/uuid-parser.pipe';
import { GetUserDto } from '../dtos/get-user.dto';
import { PaginatedUserDto } from '../dtos/paginated-user.dto';

@UseGuards(AuthGuard)
@ApiBearerAuth()
@ApiTags('[Users Routes]')
@Controller('users')
@ApiUnauthorizedResponse({
  description: 'Не авторизован. Попробуйте авторизоваться снова',
})
export class UserController {
  constructor(private readonly userService: UserService) {}
  @ApiOkResponse({
    type: PaginatedUserDto,
    description: 'Получить всех пользователей из базы данных',
  })
  @ApiOperation({
    summary: 'Получить всех пользователей из базы данных',
  })
  @Get()
  getAll(@Query() getUserDto: GetUserDto): Promise<PaginatedUserDto> {
    return this.userService.getAll(getUserDto);
  }

  @ApiOkResponse({
    type: UserDto,
    description: 'Получить пользователя по id из базы данных',
  })
  @ApiOperation({
    summary: 'Получить пользователя по id из базы данных',
  })
  @Get('/:id')
  async getById(@Param('id', new ParseUUID()) id: string): Promise<UserDto> {
    const user = await this.userService.getByIdOrFail(id);
    return new UserDto(user);
  }

  @ApiCreatedResponse({
    type: UserDto,
    description: 'Добавить пользователя в базу данных',
  })
  @ApiNotFoundResponse({
    description: 'Роль по такому ID не найдена.',
  })
  @ApiConflictResponse({
    description: 'Пользователь с такой почтой уже зарегистрирован.',
  })
  @ApiOperation({
    summary: 'Добавить пользователя в базу данных',
  })
  @Post()
  async create(@Body() body: CreateUserDto): Promise<UserDto> {
    const user = await this.userService.create(body);
    return new UserDto(user);
  }

  @ApiNoContentResponse({
    description: 'Удалить пользователя из базы данных',
  })
  @ApiNotFoundResponse({
    description: 'Пользователь по такому ID не найден.',
  })
  @ApiOperation({
    summary: 'Удалить пользователя из базы данных',
  })
  @Delete('/:id')
  async delete(@Param('id', new ParseUUID()) id: string): Promise<void> {
    await this.userService.deleteById(id);
  }

  @ApiAcceptedResponse({
    description: `Обновить данные пользователя из базы данных.
    \nБудут сохранены только те документы, ключи которых указаны в массиве во время отправки запроса.
    \nЧтобы не обновлять документы, не отправляйте этот параметр ни с какими значениями.
    \nЧтобы удалить какой-то параметр, отправляйте null`,
  })
  @ApiNotFoundResponse({
    description: 'Пользователь по такому ID не найден.',
  })
  @ApiOperation({
    summary: 'Обновить данные пользователя из базы данных',
  })
  @Patch('/:id')
  async update(
    @Param('id', new ParseUUID()) id: string,
    @Body() body: UpdateUserDto,
  ): Promise<void> {
    await this.userService.updateById(id, body);
  }
}
