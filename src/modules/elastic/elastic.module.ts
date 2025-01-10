import { Module } from '@nestjs/common';
import { Client } from '@elastic/elasticsearch';
import { ConfigService } from '@nestjs/config';
import { ElasticService } from './services/elastic.service';
import { ElasticController } from './controllers/elastic.controller';

@Module({
  controllers: [ElasticController],
  providers: [
    {
      provide: 'ELASTICSEARCH_CLIENT',
      useFactory: async (configService: ConfigService) => {
        return new Client({
          node: await configService.get('elastic.node'),
          auth: {
            username: (await configService.get('elastic.username')) || '',
            password: (await configService.get('elastic.password')) || '',
          },
        });
      },
      inject: [ConfigService],
    },
    ElasticService,
  ],
})
export class ElasticModule {}
