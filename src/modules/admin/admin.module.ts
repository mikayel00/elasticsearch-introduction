import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminEntity } from './entities/admin.entity';
import { AdminService } from './services/admin.service';

@Module({
  imports: [TypeOrmModule.forFeature([AdminEntity])],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}
