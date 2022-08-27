import { Global, Module } from '@nestjs/common';
import { HandlerService } from './handler.service';

@Global()
@Module({
  providers: [HandlerService],
})
export class HandlerModule {}
