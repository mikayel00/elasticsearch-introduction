import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RoleRightsInterface } from '../interfaces';
import { UserEntity } from '../../user/entities/user.entity';

@Entity({ name: RoleEntity.tableName })
export class RoleEntity {
  static tableName = 'roles';

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'jsonb' })
  rights: RoleRightsInterface[];

  @OneToMany(() => UserEntity, (userEntity) => userEntity.role)
  users?: UserEntity[];
}
