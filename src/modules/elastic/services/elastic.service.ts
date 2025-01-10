import { Inject, Injectable } from '@nestjs/common';
import { Client } from '@elastic/elasticsearch';

@Injectable()
export class ElasticService {
  constructor(
    @Inject('ELASTICSEARCH_CLIENT')
    private readonly elasticsearchClient: Client,
  ) {}

  async createIndex() {
    return this.elasticsearchClient.indices.create({
      index: 'users',
    });
  }

  async getIndex() {
    return this.elasticsearchClient.indices.get({ index: 'users' });
  }

  async deleteIndex() {
    return this.elasticsearchClient.indices.delete({ index: 'users' });
  }

  async addDocument(index: string, id: string, document: any) {
    return await this.elasticsearchClient.index({
      index,
      id,
      document,
    });
  }

  async search(index: string) {
    return await this.elasticsearchClient.search({
      index,
      query: {
        match: { name: 'John' },
      },
    });
  }

  generateData(count: number) {
    const firstNames = [
      'John',
      'Jane',
      'Alice',
      'Bob',
      'Michael',
      'Sarah',
      'David',
      'Emily',
    ];
    const lastNames = [
      'Doe',
      'Smith',
      'Johnson',
      'Brown',
      'Williams',
      'Jones',
      'Miller',
      'Davis',
    ];
    const emailDomains = [
      'example.com',
      'test.com',
      'mail.com',
      'random.org',
      'sample.net',
    ];

    const data = [];
    for (let i = 1; i <= count; i++) {
      const randomFirstName =
        firstNames[Math.floor(Math.random() * firstNames.length)];
      const randomLastName =
        lastNames[Math.floor(Math.random() * lastNames.length)];
      const randomName = `${randomFirstName} ${randomLastName}`;
      const randomEmail = `${randomFirstName.toLowerCase()}.${randomLastName.toLowerCase()}@${emailDomains[Math.floor(Math.random() * emailDomains.length)]}`;
      const randomAge = Math.floor(Math.random() * 50) + 18; // Age between 18 and 67

      data.push({
        id: i,
        name: randomName,
        email: randomEmail,
        age: randomAge,
        sex: 'male',
      });
    }
    return data;
  }
}
