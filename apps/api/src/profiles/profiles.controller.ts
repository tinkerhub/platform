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

  @Post()
  async create(
    @Req() req: any,
    @Res({ passthrough: true }) res: any,
    @Body() createProfileDto: CreateProfileDto,
    @Session() session: SessionContainer
  ) {
    try {
      const AuthId = session.getUserId();
      const mobile = (await Passwordless.getUserById({ userId: AuthId }))!.phoneNumber!;
      const createProfile = createProfileDto;
      createProfile.AuthId = AuthId;
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
    let AuthId: string;
    try {
      AuthId = session.getUserId();
      return await this.profilesService.read(AuthId);
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
    let AuthId: string;
    try {
      AuthId = session.getUserId();
      return await this.profilesService.update(AuthId, updateProfileDto);
    } catch (err) {
      throw new UpdateException(err);
    }
  }
}
