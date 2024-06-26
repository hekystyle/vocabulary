import assert from 'assert';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Model } from 'mongoose';
import github from 'passport-github2';
import type { AppConfigService } from '@/config/app-config.service.js';
import { IdentityProvider, IdentityProviderType } from '@/users/identity-provider.entity.js';
import { User } from '@/users/user.entity.js';

@Injectable()
export class GitHubStrategy extends PassportStrategy(github.Strategy, 'github') {
  private logger = new Logger(GitHubStrategy.name);

  constructor(
    @Inject(ConfigService)
    configService: AppConfigService,
    @InjectModel(User.name)
    private readonly userRepository: Model<User>,
    @InjectModel(IdentityProvider.name)
    private readonly identityProviderRepository: Model<IdentityProvider>,
  ) {
    super({
      clientID: configService.get('github.clientId', { infer: true }),
      clientSecret: configService.get('github.clientSecret', { infer: true }),
      callbackURL: '/api/auth/github/callback',
      // @ts-expect-error -- types are wrong
      state: true,
    } satisfies github.StrategyOptions);
  }

  async validate(_accessToken: string, _refreshToken: string, profile: github.Profile): Promise<User> {
    this.logger.debug({ msg: 'Searching for user with linked GitHub account ...', githubId: profile.id });

    const identity = await this.identityProviderRepository.findOne({
      type: IdentityProviderType.GitHub,
      id: profile.id,
    });

    if (identity) {
      this.logger.debug({
        msg: 'User found by linked GitHub account',
        userId: identity.user.toString(),
        githubId: profile.id,
      });
      const user = await this.userRepository.findById(identity.user);

      assert(user, 'User not found by linked GitHub account');

      return user;
    }

    assert(profile.emails, 'Emails are required');

    const emails = profile.emails.map(email => email.value);

    let user = await this.userRepository.findOne({
      email: { $in: emails },
    });

    if (user) {
      this.logger.debug({
        msg: 'User found by one of GitHub emails, linking GitHub account ...',
        userId: user._id.toString(),
        github: { id: profile.id, emails },
      });

      await this.identityProviderRepository.create({
        id: profile.id,
        type: IdentityProviderType.GitHub,
        user: user._id,
      });

      return user;
    }

    const [email] = profile.emails.map(shape => shape.value);

    assert(email, 'Email is required');

    this.logger.debug({
      msg: `User not found by identity or emails, creating new ...`,
      email,
      githubId: profile.id,
    });

    user = await this.userRepository.create({
      email,
      passwordHash: null,
    });

    await this.identityProviderRepository.create({
      id: profile.id,
      type: IdentityProviderType.GitHub,
      user: user._id,
    });

    return user;
  }
}
