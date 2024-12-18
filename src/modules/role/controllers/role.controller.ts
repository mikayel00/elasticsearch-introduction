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
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { RoleService } from '../services/role.service';
import { RoleDto } from '../dtos/role.dto';
import { ParseUUID } from '../../../common/pipes/uuid-parser.pipe';
import { CreateRoleDto } from '../dtos/create-role.dto';
import { UpdateRoleDto } from '../dtos/update-role.dto';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { PaginatedRoleDto } from '../dtos/paginated-role.dto';
import { GetRoleDto } from '../dtos/get-role.dto';

@UseGuards(AuthGuard)
@ApiBearerAuth()
@ApiTags('[Role Routes]')
@Controller('roles')
@ApiUnauthorizedResponse({
  description: 'Не авторизован. Попробуйте авторизоваться снова',
})
export class RoleController {
  constructor(private readonly roleService: RoleService) {}
  @ApiOkResponse({
    type: PaginatedRoleDto,
    description: 'Получить все роли из базы данных',
  })
  @ApiOperation({
    summary: 'Получить все роли из базы данных',
  })
  @Get()
  getAll(@Query() getRoleDto: GetRoleDto): Promise<PaginatedRoleDto> {
    return this.roleService.getAll(getRoleDto);
  }

  @ApiOkResponse({
    type: RoleDto,
    description: 'Получить роль по id из базы данных',
  })
  @ApiOperation({
    summary: 'Получить роль по id из базы данных',
  })
  @Get('/:id')
  async getById(@Param('id', new ParseUUID()) id: string): Promise<RoleDto> {
    const role = await this.roleService.getByIdOrFail(id);
    return new RoleDto(role);
  }

  @ApiCreatedResponse({
    type: RoleDto,
    description: 'Добавить роль в базу данных',
  })
  @ApiOperation({
    summary: 'Добавить роль в базу данных',
  })
  @Post()
  async create(@Body() body: CreateRoleDto): Promise<RoleDto> {
    const role = await this.roleService.create(body);
    return new RoleDto(role);
  }

  @ApiNoContentResponse({
    description: 'Удалить роль из базы данных',
  })
  @ApiNotFoundResponse({
    description: 'Роль по такому ID не найдена.',
  })
  @ApiOperation({
    summary: 'Удалить роль из базы данных',
  })
  @Delete('/:id')
  async delete(@Param('id', new ParseUUID()) id: string): Promise<void> {
    await this.roleService.deleteById(id);
  }

  @ApiAcceptedResponse({
    description: `Обновить данные роли из базы данных.`,
  })
  @ApiNotFoundResponse({
    description: 'Роль по такому ID не найдена.',
  })
  @ApiOperation({
    summary: 'Обновить данные роли из базы данных',
  })
  @Patch('/:id')
  async update(
    @Param('id', new ParseUUID()) id: string,
    @Body() body: UpdateRoleDto,
  ): Promise<void> {
    await this.roleService.updateById(id, body);
  }
}
