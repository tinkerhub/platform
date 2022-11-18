import { Controller, Get, Query } from '@nestjs/common';
import { NocoService } from './noco.service';

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
