import { Controller, Get, Post, Query } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { CollegeCreateException } from 'src/profiles/exception/college.create.exception';
import { CollegeSearchException } from 'src/profiles/exception/college.search.exception';
import { SkillSearchException } from 'src/profiles/exception/skill.search.exception';
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
    try {
      const collegeData = await this.nocoService.getCollegeName(search, limit, page);
      return collegeData;
    } catch (err) {
      throw new CollegeSearchException(err);
    }
  }

  @Get('skills')
  async getSkills(
    @Query('search') search: string,
    @Query('limit') limit: string,
    @Query('page') page: string
  ) {
    try {
      const skillData = await this.nocoService.getSkills(search, limit, page);
      return skillData;
    } catch (err) {
      throw new SkillSearchException(err);
    }
  }

  @Post('college')
  async createCollege(@Query('name') name: string) {
    try {
      const collegeData = await this.nocoService.createCollege(name);
      return collegeData;
    } catch (err) {
      throw new CollegeCreateException(err);
    }
  }
}
