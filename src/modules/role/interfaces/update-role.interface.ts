import { RoleRightsInterface } from './role-rights.interface';

export interface UpdateRoleInterface {
  name?: string;
  description?: string;
  rights?: RoleRightsInterface[];
}
