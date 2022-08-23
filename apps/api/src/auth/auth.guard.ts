import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { verifySession } from 'supertokens-node/recipe/session/framework/fastify';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = context.switchToHttp();

    const resp = ctx.getResponse();
    const err: any = resp;
    // You can create an optional version of this by passing {sessionRequired: false} to verifySession
    await verifySession()(ctx.getRequest(), resp);

    if (err) {
      throw err;
    }

    return true;
  }
}
