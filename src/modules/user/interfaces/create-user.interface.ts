export interface CreateUserInterface {
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  roleId: string;
  avatarUrl?: string;
  documents?: string[];
  additionalInformation?: string;
}
