import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import {
  CreateUserInterface,
  UpdateUserInterface,
  GetUserParamsInterface,
} from '../interfaces';
import { RoleService } from '../../role/services/role.service';
import { paginate } from 'nestjs-typeorm-paginate';
import { PaginatedUserDto } from '../dtos/paginated-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private readonly roleService: RoleService,
  ) {}

  async getAll(data: GetUserParamsInterface): Promise<PaginatedUserDto> {
    const { page, limit, order } = data;

    const usersQuery = this.userRepository.createQueryBuilder('users');

    if (data.firstName) {
      usersQuery.where('users.firstName = :firstName', {
        firstName: data.firstName,
      });
    }
    if (data.lastName) {
      usersQuery.where('users.lastName = :lastName', {
        lastName: data.lastName,
      });
    }

    if (data.roleName) {
      usersQuery.innerJoinAndSelect(
        'users.role',
        'role',
        'role.name = :roleName',
        {
          roleName: data.roleName,
        },
      );
    }

    if (order) {
      usersQuery.orderBy('users.createdAt', order);
    }

    const { items, meta } = await paginate(usersQuery, { page, limit });
    return {
      data: items,
      meta: { page: meta.currentPage, limit: meta.itemsPerPage },
    };
  }

  async getByIdOrFail(id: string): Promise<UserEntity> {
    const user = await this.userRepository
      .createQueryBuilder('users')
      .where('users.id = :id', { id })
      .getOne();

    if (!user) {
      throw new NotFoundException('Пользователь по такому ID не найден.');
    }
    return user;
  }

  private async checkIfExists(email: string): Promise<boolean> {
    const user = await this.userRepository
      .createQueryBuilder('users')
      .where('users.email = :email', { email })
      .getOne();

    return !!user;
  }

  async create(data: CreateUserInterface): Promise<UserEntity> {
    await this.roleService.getByIdOrFail(data.roleId);
    const userExists = await this.checkIfExists(data.email);
    if (userExists) {
      throw new ConflictException(
        'Пользователь с такой почтой уже зарегистрирован.',
      );
    }
    const user = this.userRepository.create(data);
    await this.userRepository.save(user);

    return user;
  }

  async deleteById(id: string): Promise<void> {
    const user = await this.getByIdOrFail(id);

    await this.userRepository.remove(user);
  }

  async updateById(id: string, body: UpdateUserInterface): Promise<void> {
    if (body.roleId) {
      await this.roleService.getByIdOrFail(body.roleId);
    }

    const user = await this.getByIdOrFail(id);

    this.userRepository.merge(user, body);

    await this.userRepository.save(user);
  }
}
