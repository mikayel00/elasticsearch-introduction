import { join } from 'path';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}
  createTypeOrmOptions(): TypeOrmModuleOptions {
    const entitiesPath = join(__dirname, '..', '..', '**', '*.entity{.ts,.js}');
    const migrationsPath = join(
      __dirname,
      '..',
      '..',
      'database',
      'migrations',
      '**',
      '*.js',
    );

    return {
      type: 'postgres',
      host: this.configService.get<string>('database.host'),
      port: this.configService.get<number>('database.port'),
      username: this.configService.get<string>('database.username'),
      password: this.configService.get<string>('database.password'),
      database: this.configService.get<string>('database.name'),
      entities: [entitiesPath],
      migrations: [migrationsPath],
      migrationsRun: true,
      logging: ['migration', 'schema'],
      namingStrategy: new SnakeNamingStrategy(),
      extra: {
        max: 100,
      },
    };
  }
}
