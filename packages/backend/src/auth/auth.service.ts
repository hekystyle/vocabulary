import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { User } from '../users/user.entity.js';
import { JwtPayload } from './jwt.payload.js';

@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);

  constructor(
    @InjectModel(User.name)
    private usersRepository: Model<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({ email: username });

    if (!user) {
      this.logger.log(`User not found by username: ${username}`);
      return undefined;
    }

    if (!user.passwordHash) {
      this.logger.warn(`User found by username: ${username} but has no passwordHash`);
      return undefined;
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    return isPasswordValid ? user : undefined;
  }

  async signJwtForUser(user: User): Promise<string> {
    const payload: JwtPayload = {
      username: user.email,
      sub: user._id.toString(),
    };

    return await this.jwtService.signAsync(payload);
  }
}
