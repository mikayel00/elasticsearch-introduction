import { RoleRightsInterface } from './role-rights.interface';

export interface CreateRoleInterface {
  name: string;
  description: string;
  rights: RoleRightsInterface[];
}
