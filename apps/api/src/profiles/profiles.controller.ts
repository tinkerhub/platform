import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Put,
  Req,
  Res,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import Session from 'supertokens-node/recipe/session';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@UseGuards(AuthGuard)
@Controller('users/profile')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Post()
  create(@Body() createProfileDto: CreateProfileDto) {
    return this.profilesService.create(createProfileDto);
  }

  @Get()
  async read(@Req() req: any, @Res({ passthrough: true }) res: any) {
    try {
      const session = await Session.getSession(req, res);
      const authid = session.getUserId();
      return await this.profilesService.read(authid);
    } catch (err) {
      throw new HttpException(
        {
          message: 'Session not available',
        },
        HttpStatus.SERVICE_UNAVAILABLE
      );
    }
  }

  @Put()
  async update(
    @Req() req: any,
    @Res({ passthrough: true }) res: any,
    @Body() updateProfileDto: UpdateProfileDto
  ) {
    try {
      const session = await Session.getSession(req, res);
      const authid = session.getUserId();
      return await this.profilesService.update(authid, updateProfileDto);
    } catch (err) {
      throw new HttpException(
        {
          message: 'Session not available',
        },
        HttpStatus.SERVICE_UNAVAILABLE
      );
    }
  }
}
