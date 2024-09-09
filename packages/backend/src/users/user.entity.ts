import { buildSchema, prop } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses.js';
import { Types } from 'mongoose';

export class User extends TimeStamps {
  declare _id: Types.ObjectId;

  @prop({ required: true })
  email!: string;

  @prop({ required: false, default: null, type: () => String })
  passwordHash!: string | null;

  @prop({ required: false, default: null, type: () => Date })
  lastDataMutationAt?: Date | null;
}

export const userSchema = buildSchema(User);
