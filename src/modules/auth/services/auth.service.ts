import { BadRequestException, Injectable } from '@nestjs/common';
import { AdminService } from '../../admin/services/admin.service';
import {
  AdminSignInInterface,
  AdminSignInResponseInterface,
} from '../interfaces';
import { JwtTokenService } from './jwt-token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly adminService: AdminService,
    private readonly jwtTokenService: JwtTokenService,
  ) {}

  async adminSignIn(
    data: AdminSignInInterface,
  ): Promise<AdminSignInResponseInterface> {
    const admin = await this.adminService.findByCredentials(data);
    if (!admin) {
      throw new BadRequestException('Неправильно введен email или пароль.');
    }

    const token = await this.jwtTokenService.createUserJwtToken(admin.id);
    return { token };
  }
}
