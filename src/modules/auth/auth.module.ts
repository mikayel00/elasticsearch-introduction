import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtConfigFactory } from './factories/jwt-config.factory';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { AdminModule } from '../admin/admin.module';
import { JwtTokenService } from './services/jwt-token.service';
import { AuthGuard } from './guards/auth.guard';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useClass: JwtConfigFactory,
    }),
    AdminModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtTokenService, AuthGuard],
  exports: [JwtTokenService],
})
export class AuthModule {}
