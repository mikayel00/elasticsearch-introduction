import { PageOptionsInterface } from './page-options.interface';

export interface PaginatedResultsInterface<T> {
  data: T[];
  meta: PageOptionsInterface;
}
