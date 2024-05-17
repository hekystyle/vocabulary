import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import bcrypt from 'bcrypt';
import { HydratedDocument, Model } from 'mongoose';
import { StrictOmit } from '../utils/StrictOmit.js';
import { User } from './user.entity.js';

export interface CreateUserDto extends StrictOmit<User, '_id' | 'passwordHash' | 'createdAt' | 'updatedAt'> {
  password: string;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private usersRepository: Model<User>,
  ) {}

  async create(user: CreateUserDto): Promise<HydratedDocument<User>> {
    const passwordHash = await bcrypt.hash(user.password, 10);

    return await this.usersRepository.create({
      ...user,
      passwordHash,
    });
  }
}
