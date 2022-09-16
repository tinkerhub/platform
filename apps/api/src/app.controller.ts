import { Controller, Get, UseGuards } from '@nestjs/common';
import { SessionContainer } from 'supertokens-node/recipe/session';
import { AppService } from './app.service';
import { AuthGuard } from './auth/auth.guard';
import { Session } from './auth/session.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return this.appService.getHello();
  }

  @Get('test') @UseGuards(AuthGuard) async getTest(
    @Session() session: SessionContainer
  ): Promise<string> {
    console.log(session);
    return 'magic';
  }
}
