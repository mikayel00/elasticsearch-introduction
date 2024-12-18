import { SortOrder } from '../types';

export interface PageOptionsInterface {
  page: number;
  limit: number;
  order?: SortOrder;
}
