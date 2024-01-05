import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { StrictOmit } from '../utils/StrictOmit.js';
import { User } from './user.entity.js';

export interface CreateUserDto extends StrictOmit<User, '_id' | 'passwordHash' | 'createdAt' | 'updatedAt'> {
  password: string;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(user: CreateUserDto): Promise<User> {
    const passwordHash = await bcrypt.hash(user.password, 10);

    return await this.usersRepository.save(
      this.usersRepository.create({
        ...user,
        passwordHash,
      }),
    );
  }
}
