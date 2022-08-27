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
  async read(id: string) {
    try {
      const resp = await this.prismaService.user.findUnique({
        where: {
          id,
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
  async update(id: string, updateProfileDto: UpdateProfileDto) {
    try {
      const resp = await this.prismaService.user.update({
        data: updateProfileDto,
        where: { id },
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
