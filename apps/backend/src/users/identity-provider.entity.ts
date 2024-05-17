import { buildSchema, prop } from '@typegoose/typegoose';
import mongoose, { Types } from 'mongoose';
import { User } from './user.entity.js';

export enum IdentityProviderType {
  GitHub = 'github',
}

export class IdentityProvider {
  declare _id: Types.ObjectId;

  @prop({ required: true, type: mongoose.Types.ObjectId })
  user!: User['_id'];

  @prop({ required: true, enum: IdentityProviderType })
  type!: IdentityProviderType;

  /**
   * Identity provider ID.
   */
  @prop({ required: true })
  id!: string;
}

export const identityProviderSchema = buildSchema(IdentityProvider);
