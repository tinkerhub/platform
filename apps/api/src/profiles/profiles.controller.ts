import { Controller, Post, Body, UseGuards, Session, Get, Req, Res, Patch } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { SessionContainer } from 'supertokens-node/recipe/session';
import Passwordless from 'supertokens-node/recipe/passwordless';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { CreateException } from './exception/create.exception';
import { ReadException } from './exception/read.exception';
import { UpdateException } from './exception/update.exception';

@UseGuards(AuthGuard)
@Controller('users/profile')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Get('college')
  async collegeName() {
    return this.profilesService.collegeName();
  }

  @Post()
  async create(
    @Req() req: any,
    @Res({ passthrough: true }) res: any,
    @Body() createProfileDto: CreateProfileDto,
    @Session() session: SessionContainer
  ) {
    try {
      const authid = session.getUserId();
      const mobile = (await Passwordless.getUserById({ userId: authid }))!.phoneNumber!;
      const createProfile = createProfileDto;
      createProfile.authid = authid;
      createProfile.mobile = mobile;
      return await this.profilesService.create(createProfile);
    } catch (err) {
      throw new CreateException(err);
    }
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
      return await this.profilesService.read(authid);
    } catch (err) {
      throw new ReadException(err);
    }
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
      return await this.profilesService.update(authid, updateProfileDto);
    } catch (err) {
      throw new UpdateException(err);
    }
  }
}
