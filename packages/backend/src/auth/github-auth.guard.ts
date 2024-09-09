import { ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import type { Request } from 'express';

export class GitHubAuthGuard extends AuthGuard('github') {
  override canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest<Request>();

    req.session.redirectUri = req.query['redirect_uri']?.toString() ?? req.session.redirectUri;

    return super.canActivate(context);
  }
}
