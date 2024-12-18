import { PageOptionsInterface } from '../../../common/interfaces';

export interface GetUserParamsInterface extends PageOptionsInterface {
  roleName?: string;
  firstName?: string;
  lastName?: string;
}
