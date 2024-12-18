import { ArgumentMetadata, ParseUUIDPipe } from '@nestjs/common';

export class ParseUUID extends ParseUUIDPipe {
  async transform(value: string, metadata: ArgumentMetadata): Promise<string> {
    try {
      return await super.transform(value, metadata);
    } catch {
      throw this.exceptionFactory('Неправильно введен UUID');
    }
  }
}
