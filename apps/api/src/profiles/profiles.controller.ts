import {
  Controller,
  Post,
  Body,
  UseGuards,
  Session,
  Get,
  Req,
  Res,
  HttpException,
  HttpStatus,
  Patch,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { SessionContainer } from 'supertokens-node/recipe/session';
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
    @Body() createProfileDto: CreateProfileDto,
    @Session() session: SessionContainer
  ) {
    let authid: string;
    let mobile: string;
    try {
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
  async read(
    @Req() req: any,
    @Res({ passthrough: true }) res: any,
    @Session() session: SessionContainer
  ) {
    let authid: string;
    try {
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
    @Body() updateProfileDto: UpdateProfileDto,
    @Session() session: SessionContainer
  ) {
    let authid: string;
    try {
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
