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
import { DepartmentService } from '../services/department.service';
import { DepartmentDto } from '../dtos/department.dto';
import { ParseUUID } from '../../../common/pipes/uuid-parser.pipe';
import { CreateDepartmentDto } from '../dtos/create-department.dto';
import { UpdateDepartmentDto } from '../dtos/update-department.dto';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { PaginatedDepartmentDto } from '../dtos/paginated-department.dto';
import { GetDepartmentDto } from '../dtos/get-department.dto';

@UseGuards(AuthGuard)
@ApiBearerAuth()
@ApiTags('[Department Routes]')
@Controller('departments')
@ApiUnauthorizedResponse({
  description: 'Не авторизован. Попробуйте авторизоваться снова',
})
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}
  @ApiOkResponse({
    type: PaginatedDepartmentDto,
    description: 'Получить все департаменты из базы данных',
  })
  @ApiOperation({
    summary: 'Получить все департаменты из базы данных',
  })
  @Get()
  getAll(
    @Query() getDepartmentDto: GetDepartmentDto,
  ): Promise<PaginatedDepartmentDto> {
    return this.departmentService.getAll(getDepartmentDto);
  }

  @ApiOkResponse({
    type: DepartmentDto,
    description: 'Получить департамент по id из базы данных',
  })
  @ApiNotFoundResponse({
    description: 'Департамент по такому ID не найден.',
  })
  @ApiOperation({
    summary: 'Получить департамент по id из базы данных',
  })
  @Get('/:id')
  async getById(
    @Param('id', new ParseUUID()) id: string,
  ): Promise<DepartmentDto> {
    const department = await this.departmentService.getByIdOrFail(id);
    return new DepartmentDto(department);
  }

  @ApiCreatedResponse({
    type: DepartmentDto,
    description: 'Добавить департамент в базу данных',
  })
  @ApiOperation({
    summary: 'Добавить департамент в базу данных',
  })
  @Post()
  async create(@Body() body: CreateDepartmentDto): Promise<DepartmentDto> {
    const department = await this.departmentService.create(body);
    return new DepartmentDto(department);
  }

  @ApiNoContentResponse({
    description: 'Удалить департамент из базы данных',
  })
  @ApiNotFoundResponse({
    description: 'Департамент по такому ID не найден.',
  })
  @ApiOperation({
    summary: 'Удалить департамент из базы данных',
  })
  @Delete('/:id')
  async delete(@Param('id', new ParseUUID()) id: string): Promise<void> {
    await this.departmentService.deleteById(id);
  }

  @ApiAcceptedResponse({
    description: `Обновить данные департамента из базы данных.`,
  })
  @ApiNotFoundResponse({
    description: 'Департамент по такому ID не найден.',
  })
  @ApiOperation({
    summary: 'Обновить данные департамента из базы данных',
  })
  @Patch('/:id')
  async update(
    @Param('id', new ParseUUID()) id: string,
    @Body() body: UpdateDepartmentDto,
  ): Promise<void> {
    await this.departmentService.updateById(id, body);
  }
}
