import { ObjectId } from 'mongodb';
import { Entity, ObjectIdColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class User {
  @ObjectIdColumn()
  _id!: ObjectId;

  @Column()
  email!: string;

  @Column({ nullable: true })
  passwordHash!: string | null;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @Column({ nullable: true })
  lastDataMutationAt?: Date | null;
}
