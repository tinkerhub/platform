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
          message: 'Session not available',
        },
        HttpStatus.SERVICE_UNAVAILABLE
      );
    }
    try {
      const createProfile = createProfileDto;
      createProfile.authid = authid;
      createProfile.mobile = mobile;
      return await this.profilesService.create(createProfile);
    } catch (error) {
      throw new HttpException(
        {
          message: "User can't be created",
        },
        HttpStatus.SERVICE_UNAVAILABLE
      );
    }
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
          message: 'Session not available',
        },
        HttpStatus.SERVICE_UNAVAILABLE
      );
    }
    try {
      return await this.profilesService.read(authid);
    } catch (error) {
      throw new HttpException(
        {
          message: "User data can't be read",
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
    let authid: string;
    try {
      const session = await Session.getSession(req, res);
      authid = session.getUserId();
    } catch (err) {
      throw new HttpException(
        {
          message: 'Session not available',
        },
        HttpStatus.SERVICE_UNAVAILABLE
      );
    }
    try {
      return await this.profilesService.update(authid, updateProfileDto);
    } catch (error) {
      throw new HttpException(
        {
          message: "User data can't be updated",
        },
        HttpStatus.SERVICE_UNAVAILABLE
      );
    }
  }
}
