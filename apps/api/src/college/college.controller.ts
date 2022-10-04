import { Controller, Get, Query } from '@nestjs/common';
import { CollegeService } from './college.service';

@Controller('college')
export class CollegeController {
  constructor(private readonly collegeService: CollegeService) {}

  @Get()
  async collegeName(
    @Query('search') search: string,
    @Query('limit') limit: string,
    @Query('page') page: string
  ) {
    return this.collegeService.collegeName(search, limit, page);
  }
}
