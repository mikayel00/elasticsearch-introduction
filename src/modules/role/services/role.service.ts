import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleEntity } from '../entities/role.entity';
import { CreateRoleInterface, UpdateRoleInterface } from '../interfaces';
import { paginate } from 'nestjs-typeorm-paginate';
import { GetRoleDto } from '../dtos/get-role.dto';
import { PaginatedRoleDto } from '../dtos/paginated-role.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private roleRepository: Repository<RoleEntity>,
  ) {}

  async getAll(data: GetRoleDto): Promise<PaginatedRoleDto> {
    const { page, limit, order } = data;

    const rolesQuery = this.roleRepository.createQueryBuilder('roles');

    if (order) {
      rolesQuery.orderBy('roles.createdAt', order);
    }

    const { items, meta } = await paginate(rolesQuery, { page, limit });

    return {
      data: items,
      meta: { page: meta.currentPage, limit: meta.itemsPerPage },
    };
  }

  async getByIdOrFail(id: string): Promise<RoleEntity> {
    const role = await this.roleRepository
      .createQueryBuilder('roles')
      .where('roles.id = :id', { id })
      .getOne();

    if (!role) {
      throw new NotFoundException('Роль по такому ID не найдена.');
    }
    return role;
  }

  async create(data: CreateRoleInterface): Promise<RoleEntity> {
    const role = this.roleRepository.create(data);
    await this.roleRepository.save(role);

    return role;
  }

  async deleteById(id: string): Promise<void> {
    const role = await this.getByIdOrFail(id);

    await this.roleRepository.remove(role);
  }

  async updateById(id: string, body: UpdateRoleInterface): Promise<void> {
    const role = await this.getByIdOrFail(id);

    this.roleRepository.merge(role, body);

    await this.roleRepository.save(role);
  }
}
