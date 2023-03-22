import { Controller, Post, Body, UseGuards, Session, Get, Req, Res, Patch } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { SessionContainer } from 'supertokens-node/recipe/session';
import Passwordless from 'supertokens-node/recipe/passwordless';
import { Throttle } from '@nestjs/throttler';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { CreateUserException } from './exception/create.user.exception';
import { ReadUserException } from './exception/read.user.exception';
import { UpdateUserException } from './exception/update.user.exception';

@UseGuards(AuthGuard)
@Throttle(
  parseInt(process.env.THROTTLE_LIMIT as string, 10),
  parseInt(process.env.TIME_TO_LIVE as string, 10)
)
@Controller('users/profile')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Post()
  async createUser(
    @Req() req: any,
    @Res({ passthrough: true }) res: any,
    @Body() createUserData: CreateProfileDto,
    @Session() session: SessionContainer
  ) {
    try {
      const authId = session.getUserId();
      const mobile = (await Passwordless.getUserById({ userId: authId }))!.phoneNumber!;
      const newCreateUserData = createUserData;
      newCreateUserData.authId = authId;
      newCreateUserData.mobile = mobile;
      return await this.profilesService.createUser(newCreateUserData);
    } catch (err) {
      throw new CreateUserException(err);
    }
  }

  @Get()
  async getUser(
    @Req() req: any,
    @Res({ passthrough: true }) res: any,
    @Session() session: SessionContainer
  ) {
    let authId: string;
    try {
      authId = session.getUserId();
      return await this.profilesService.getUserById(authId);
    } catch (err) {
      throw new ReadUserException(err);
    }
  }

  @Patch()
  async updateUser(
    @Req() req: any,
    @Res({ passthrough: true }) res: any,
    @Body() updateUserData: UpdateProfileDto,
    @Session() session: SessionContainer
  ) {
    let authId: string;
    try {
      authId = session.getUserId();
      return await this.profilesService.updateUser(authId, updateUserData);
    } catch (err) {
      throw new UpdateUserException(err);
    }
  }
}
