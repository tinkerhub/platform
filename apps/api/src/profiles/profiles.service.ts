import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClientUnknownRequestError } from '@prisma/client/runtime';
import { CreateProfileDto } from './dto/create-profile.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateProfileDto } from './dto/update-profile.dto';

interface Resp {
  message: string;
  data?: unknown;
}

@Injectable()
export class ProfilesService {
  constructor(private prismaService: PrismaService) {}

  // Response Handler
  Success(resp: Resp) {
    return {
      Success: true,
      message: resp.message,
      data: resp.data,
    };
  }

  // Method to CREATE a new profile
  async create(createProfileDto: CreateProfileDto) {
    const ReadResp = await this.read(createProfileDto.authid);
    const EmailResp = await this.EmailRead(createProfileDto.email);
    if (ReadResp.data != null) {
      throw new HttpException(
        {
          success: false,
          error: 'User Exists',
        },
        HttpStatus.CONFLICT
      );
    }
    if (EmailResp != null && EmailResp.data != null) {
      throw new HttpException(
        {
          success: false,
          error: 'Email already in use',
        },
        HttpStatus.CONFLICT
      );
    }
    const d = new Date(createProfileDto.dob);
    const createProfile: CreateProfileDto = createProfileDto;
    createProfile.dob = d;
    try {
      const resp = await this.prismaService.user.create({
        // @ts-ignore
        data: createProfileDto,
      });
      return this.Success({
        data: resp,
        message: 'User was created succesfully',
      });
    } catch (err) {
      if (err instanceof PrismaClientUnknownRequestError) {
        throw err;
      } else {
        throw new HttpException(
          {
            success: false,
            error: "Could'nt create user",
          },
          HttpStatus.BAD_REQUEST
        );
      }
    }
  }

  // Method to READ an existing profile
  async read(authid: string) {
    try {
      const resp = await this.prismaService.user.findFirst({
        where: {
          authid,
        },
      });
      return this.Success({
        data: resp,
        message: 'User info was read succesfully',
      });
    } catch (err) {
      if (err instanceof PrismaClientUnknownRequestError) {
        throw err;
      } else {
        throw new HttpException(
          {
            success: false,
            error: "Could'nt read user info",
          },
          HttpStatus.BAD_REQUEST
        );
      }
    }
  }

  // Method to READ an existing profile with Email
  async EmailRead(email: string | undefined) {
    if (typeof email === 'undefined') {
      return { data: null };
    }
    try {
      const resp = await this.prismaService.user.findFirst({
        where: {
          email,
        },
      });
      return this.Success({
        data: resp,
        message: 'User info was read succesfully',
      });
    } catch (err) {
      if (err instanceof PrismaClientUnknownRequestError) {
        throw err;
      } else {
        throw new HttpException(
          {
            success: false,
            error: "Could'nt read user info",
          },
          HttpStatus.BAD_REQUEST
        );
      }
    }
  }

  // Method to UPDATE an existing profile
  async update(authid: string, updateProfileDto: UpdateProfileDto) {
    const EmailResp = await this.EmailRead(updateProfileDto.email);
    if (EmailResp.data != null) {
      throw new HttpException(
        {
          success: false,
          error: 'Email already in use',
        },
        HttpStatus.CONFLICT
      );
    }
    const updateProfile: UpdateProfileDto = updateProfileDto;
    if (updateProfileDto.dob !== undefined) {
      const d = new Date(updateProfileDto.dob);
      updateProfile.dob = d;
    }
    try {
      const resp = await this.prismaService.user.update({
        where: { authid },
        data: updateProfile,
      });
      return this.Success({
        data: resp,
        message: 'User info was updated succesfully',
      });
    } catch (err) {
      if (err instanceof PrismaClientUnknownRequestError) {
        throw err;
      } else {
        throw new HttpException(
          {
            success: false,
            error: "Could'nt update user info",
          },
          HttpStatus.BAD_REQUEST
        );
      }
    }
  }
}
