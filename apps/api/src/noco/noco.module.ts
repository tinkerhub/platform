import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { NocoController } from './noco.controller';
import { NocoService } from './noco.service';

@Module({
  controllers: [NocoController],
  providers: [NocoService, PrismaService],
})
export class NocoModule {}
