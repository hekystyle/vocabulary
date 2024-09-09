/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging -- using typegoose */
import { buildSchema, modelOptions, prop } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses.js';
import { Types } from 'mongoose';
import { StrictOmit } from '../utils/StrictOmit.js';

@modelOptions({
  schemaOptions: {
    timestamps: true,
    versionKey: false,
  },
})
export class Term extends TimeStamps {
  declare _id: Types.ObjectId;

  @prop({ required: true })
  word!: string;

  @prop({ required: true })
  partOfSpeech!: string;

  @prop({ required: true })
  translation!: string;

  @prop({ required: true })
  definition!: string;

  @prop({ required: true, type: () => [String] })
  tags!: string[];

  @prop({ required: false, default: null, type: () => Date })
  deletedAt!: Date | null;

  @prop({ required: true })
  owner!: Types.ObjectId;
}

export const termSchema = buildSchema(Term);

export interface SerializedTerm extends StrictOmit<Term, '_id' | 'owner' | 'createdAt' | 'updatedAt' | 'deletedAt'> {
  _id: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
