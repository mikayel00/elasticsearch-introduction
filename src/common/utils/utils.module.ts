import { Global, Module } from '@nestjs/common';
import { HashService } from './hash.service';

const services = [HashService];
@Global()
@Module({
  providers: services,
  exports: services,
})
export class UtilsModule {}
