import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminEntity } from '../entities/admin.entity';
import { AdminSignInInterface } from '../../auth/interfaces';
import { HashService } from '../../../common/utils/hash.service';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminEntity)
    private adminRepository: Repository<AdminEntity>,
    private readonly hashService: HashService,
  ) {}

  async findByCredentials(data: AdminSignInInterface): Promise<AdminEntity> {
    const admin = await this.adminRepository.findOne({
      where: {
        email: data.email,
      },
    });

    if (!admin) {
      throw new ForbiddenException('Неправильно введен email или пароль');
    }

    const isCorrectPassword = await this.hashService.compare(
      data.password,
      admin.password,
    );

    if (!isCorrectPassword) {
      throw new ForbiddenException('Неправильно введен email или пароль');
    }

    return admin;
  }

  findOneById(id: string): Promise<AdminEntity> {
    return this.adminRepository.findOne({
      where: {
        id,
      },
    });
  }
}
