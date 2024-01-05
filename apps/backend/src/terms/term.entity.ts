import { Entity, ObjectId, ObjectIdColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
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
  tags!: string[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @Column({ nullable: true })
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
