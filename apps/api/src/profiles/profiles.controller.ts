import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Req,
  Res,
  HttpException,
  HttpStatus,
  Patch,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import Session from 'supertokens-node/recipe/session';
import Passwordless from 'supertokens-node/recipe/passwordless';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@UseGuards(AuthGuard)
@Controller('users/profile')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Post()
  async create(
    @Req() req: any,
    @Res({ passthrough: true }) res: any,
    @Body() createProfileDto: CreateProfileDto
  ) {
    let authid: string;
    let mobile: string;
    try {
      const session = await Session.getSession(req, res);
      authid = session.getUserId();
      mobile = (await Passwordless.getUserById({ userId: authid }))!.phoneNumber!;
    } catch (err) {
      throw new HttpException(
        {
          success: false,
          error: 'Session not available',
        },
        HttpStatus.SERVICE_UNAVAILABLE
      );
    }
    const createProfile = createProfileDto;
    createProfile.authid = authid;
    createProfile.mobile = mobile;
    return this.profilesService.create(createProfile);
  }

  @Get()
  async read(@Req() req: any, @Res({ passthrough: true }) res: any) {
    let authid: string;
    try {
      const session = await Session.getSession(req, res);
      authid = session.getUserId();
    } catch (err) {
      throw new HttpException(
        {
          success: false,
          error: 'Session not available',
        },
        HttpStatus.SERVICE_UNAVAILABLE
      );
    }
    return this.profilesService.read(authid);
  }

  @Patch()
  async update(
    @Req() req: any,
    @Res({ passthrough: true }) res: any,
    @Body() updateProfileDto: UpdateProfileDto
  ) {
    let authid: string;
    try {
      const session = await Session.getSession(req, res);
      authid = session.getUserId();
    } catch (err) {
      throw new HttpException(
        {
          success: false,
          error: 'Session not available',
        },
        HttpStatus.SERVICE_UNAVAILABLE
      );
    }
    return this.profilesService.update(authid, updateProfileDto);
  }
}
