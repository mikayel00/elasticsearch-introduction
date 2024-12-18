import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashService {
  async hash(source: string): Promise<string> {
    const salt = await bcrypt.genSalt(12);
    return bcrypt.hash(source, salt);
  }

  async compare(origin: string, hash: string): Promise<boolean> {
    return bcrypt.compare(origin, hash);
  }
}
