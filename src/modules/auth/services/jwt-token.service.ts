import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { AdminService } from '../../admin/services/admin.service';
import { AdminEntity } from '../../admin/entities/admin.entity';

@Injectable()
export class JwtTokenService {
  constructor(
    private readonly jwtService: NestJwtService,
    private readonly config: ConfigService,
    private readonly adminService: AdminService,
  ) {}

  decode<TokenPayload>(token: string): TokenPayload {
    return this.jwtService.decode<TokenPayload>(token);
  }

  async createUserJwtToken(id: string): Promise<any> {
    const payload = {
      sub: id,
    };

    return this.jwtService.sign(payload);
  }

  async verifyToken(authHeader: string): Promise<AdminEntity> {
    if (!authHeader) {
      throw new UnauthorizedException(
        'Не авторизован. Попробуйте авторизоваться снова',
      );
    }

    const token = this.extractToken(authHeader);
    if (!token) {
      throw new UnauthorizedException(
        'Не авторизован. Попробуйте авторизоваться снова',
      );
    }

    try {
      const payload = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });

      const admin = await this.adminService.findOneById(payload.sub);

      if (!admin)
        throw new UnauthorizedException(
          'Не авторизован. Попробуйте авторизоваться снова',
        );

      return admin;
    } catch {
      throw new UnauthorizedException(
        'Не авторизован. Попробуйте авторизоваться снова',
      );
    }
  }

  private extractToken(authHeader: string): string | null {
    const [bearer, token] = authHeader.split(' ');
    if (bearer !== 'Bearer' || !token) {
      return null;
    }
    return token;
  }
}
