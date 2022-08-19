import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { verifySession } from 'supertokens-node/recipe/session/framework/express';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = context.switchToHttp();

    let err: any;
    const resp = ctx.getResponse();
    // You can create an optional version of this by passing {sessionRequired: false} to verifySession
    await verifySession()(ctx.getRequest(), resp, (res: any) => {
      err = res;
    });

    if (err) {
      throw err;
    }

    return true;
  }
}
