import { Controller, Get, Query } from '@nestjs/common';
import { NocoService } from './noco.service';

@Controller()
export class NocoController {
  constructor(private readonly nocoService: NocoService) {}

  @Get('college')
  async collegeName(
    @Query('search') search: string,
    @Query('limit') limit: string,
    @Query('page') page: string
  ) {
    return this.nocoService.collegeName(search, limit, page);
  }

  @Get('skills')
  async skills(
    @Query('search') search: string,
    @Query('limit') limit: string,
    @Query('page') page: string
  ) {
    return this.nocoService.skills(search, limit, page);
  }
}
