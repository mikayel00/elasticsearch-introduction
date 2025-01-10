import { ApiTags } from '@nestjs/swagger';
import { Controller, Delete, Get, Post } from '@nestjs/common';
import { ElasticService } from '../services/elastic.service';

@ApiTags('[Elastic Routes]')
@Controller('elasticsearch')
export class ElasticController {
  constructor(private readonly elasticService: ElasticService) {}

  @Post()
  async create() {
    return this.elasticService.createIndex();
  }

  @Delete()
  async delete() {
    await this.elasticService.deleteIndex();
  }

  @Get()
  async get() {
    return this.elasticService.getIndex();
  }

  @Post('document')
  async createDocument() {
    const users = this.elasticService.generateData(1);
    users.forEach((user) => {
      return this.elasticService.addDocument('users', user.id, user);
    });
  }

  @Get('document')
  async search() {
    return this.elasticService.search('users');
  }
}
