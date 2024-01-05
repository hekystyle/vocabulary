import { ObjectId } from 'mongodb';
import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { User } from './user.entity.js';

export enum IdentityProviderType {
  GitHub = 'github',
}

@Entity()
export class IdentityProvider {
  @ObjectIdColumn()
  _id!: ObjectId;

  @Column()
  user!: User['_id'];

  @Column({ type: 'enum', enum: IdentityProviderType })
  type!: IdentityProviderType;

  /**
   * Identity provider ID.
   */
  @Column()
  id!: string;
}
