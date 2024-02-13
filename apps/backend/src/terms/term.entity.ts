import {
  Entity,
  ObjectId,
  ObjectIdColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { StrictOmit } from '../utils/StrictOmit.js';

@Entity()
export class Term {
  @ObjectIdColumn()
  _id!: ObjectId;

  @Column()
  word!: string;

  @Column()
  partOfSpeech!: string;

  @Column()
  translation!: string;

  @Column()
  definition!: string;

  @Column()
  answersCount!: number;

  @Column()
  correctAnswersCount!: number;

  @Column()
  tags!: string[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt!: Date | null;

  @Column()
  owner!: ObjectId;
}

export interface SerializedTerm extends StrictOmit<Term, '_id' | 'owner' | 'createdAt' | 'updatedAt' | 'deletedAt'> {
  _id: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
