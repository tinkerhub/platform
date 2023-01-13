import { Controller, Get, Query } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { NocoService } from './noco.service';

@Throttle(
  parseInt(process.env.THROTTLE_LIMIT as string, 10),
  parseInt(process.env.TIME_TO_LIVE as string, 10)
)
@Controller()
export class NocoController {
  constructor(private readonly nocoService: NocoService) {}

  @Get('college')
  async getCollegeName(
    @Query('search') search: string,
    @Query('limit') limit: string,
    @Query('page') page: string
  ) {
    return this.nocoService.getCollegeName(search, limit, page);
  }

  @Get('skills')
  async getSkills(
    @Query('search') search: string,
    @Query('limit') limit: string,
    @Query('page') page: string
  ) {
    return this.nocoService.getSkills(search, limit, page);
  }
}
