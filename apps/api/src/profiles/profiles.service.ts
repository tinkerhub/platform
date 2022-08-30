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
      ok: true,
      message: resp.message,
      data: resp.data,
    };
  }

  // Method to CREATE a new profile
  async create(createProfileDto: CreateProfileDto) {
    const ReadResp = await this.read(createProfileDto.authid);
    const EmailResp = await this.EmailRead(createProfileDto.email);
    if (ReadResp.data != null) {
      return { message: 'User Exists' };
    }
    if (EmailResp != null && EmailResp.data != null) {
      return { message: 'Email already in use' };
    }
    try {
      const resp = await this.prismaService.user.create({
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
            message: "Could'nt create user",
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
            message: "Could'nt read user info",
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
            message: "Could'nt read user info",
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
      return { message: 'Email already in use' };
    }
    try {
      const resp = await this.prismaService.user.update({
        where: { authid },
        data: updateProfileDto,
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
            message: "Could'nt update user info",
          },
          HttpStatus.BAD_REQUEST
        );
      }
    }
  }
}
