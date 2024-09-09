import { Controller, Get, Logger, Post, Req, Res, UseGuards } from '@nestjs/common';
import { User } from '@/users/user.entity.js';
import { AuthService } from './auth.service.js';
import { GitHubAuthGuard } from './github-auth.guard.js';
import { PasswordAuthGuard } from './password-auth.guard.js';
import { Public } from './public.decorator.js';
import type { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(PasswordAuthGuard)
  @Post('password')
  async logInWithPassword(@Req() req: Request) {
    this.logger.debug(this.logInWithPassword.name);

    return {
      jwt: await this.authService.signJwtForUser(req.user as User),
    };
  }

  @Public()
  @UseGuards(GitHubAuthGuard)
  @Get('github')
  async logInWithGitHub() {
    this.logger.debug(this.logInWithGitHub.name);
  }

  @Public()
  @UseGuards(GitHubAuthGuard)
  @Get('github/callback')
  async logInWithGitHubCallback(
    @Req()
    req: Request,
    @Res({ passthrough: true })
    res: Response,
  ) {
    this.logger.debug(this.logInWithGitHubCallback.name);

    const jwt = await this.authService.signJwtForUser(req.user as User);

    req.session.jwt = jwt;

    const { redirectUri } = req.session;

    if (redirectUri) res.redirect(redirectUri);
  }

  @Get('profile')
  getProfile(@Req() req: Request) {
    this.logger.debug(this.getProfile.name);

    return req.user;
  }
}
