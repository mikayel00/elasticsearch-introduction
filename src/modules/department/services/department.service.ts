import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DepartmentEntity } from '../entities/department.entity';
import {
  CreateDepartmentInterface,
  UpdateDepartmentInterface,
} from '../interfaces';
import { GetDepartmentDto } from '../dtos/get-department.dto';
import { PaginatedDepartmentDto } from '../dtos/paginated-department.dto';
import { paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(DepartmentEntity)
    private departmentRepository: Repository<DepartmentEntity>,
  ) {}

  async getAll(data: GetDepartmentDto): Promise<PaginatedDepartmentDto> {
    const { page, limit, order } = data;

    const departmentsQuery =
      this.departmentRepository.createQueryBuilder('departments');

    if (order) {
      departmentsQuery.orderBy('departments.createdAt', order);
    }

    const { items, meta } = await paginate(departmentsQuery, { page, limit });

    return {
      data: items,
      meta: { page: meta.currentPage, limit: meta.itemsPerPage },
    };
  }

  async getByIdOrFail(id: string): Promise<DepartmentEntity> {
    const department = await this.departmentRepository
      .createQueryBuilder('departments')
      .where('departments.id = :id', { id })
      .getOne();

    if (!department) {
      throw new NotFoundException('Департамент по такому ID не найден.');
    }
    return department;
  }

  async create(data: CreateDepartmentInterface): Promise<DepartmentEntity> {
    const department = this.departmentRepository.create(data);
    await this.departmentRepository.save(department);

    return department;
  }

  async deleteById(id: string): Promise<void> {
    const department = await this.getByIdOrFail(id);

    await this.departmentRepository.remove(department);
  }

  async updateById(id: string, body: UpdateDepartmentInterface): Promise<void> {
    const department = await this.getByIdOrFail(id);

    this.departmentRepository.merge(department, body);

    await this.departmentRepository.save(department);
  }
}
