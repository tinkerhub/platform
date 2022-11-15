import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { CreateException } from './exception/create.exception';
import { UpdateException } from './exception/update.exception';

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
    const user = await this.getUserById(createProfileDto.authId);
    const userByEmail = await this.getEmailRead(createProfileDto.email);
    if (user.data != null) {
      throw new CreateException('User Exists');
    }
    if (userByEmail != null && userByEmail.data != null) {
      throw new CreateException('User with same email exists');
    }

    const skillArray = createProfileDto.skills.map((e: any) => ({
      create: { name: e.name },
      where: {
        id: e.id,
      },
    }));
    const resp = await this.prismaService.user.create({
      data: {
        ...createProfileDto,
        skills: { connectOrCreate: skillArray },
      },
    });

    return this.Success({
      data: resp,
      message: 'User was created succesfully',
    });
  }

  // Method to READ an existing profile
  async getUserById(authId: string) {
    const resp = await this.prismaService.user.findFirst({
      where: {
        authId,
      },
    });
    return this.Success({
      data: resp,
      message: 'User info was read succesfully',
    });
  }

  // Method to READ an existing profile with Email
  async getEmailRead(email: string | undefined) {
    if (typeof email === 'undefined') {
      return { data: null };
    }
    const resp = await this.prismaService.user.findFirst({
      where: {
        email,
      },
    });
    return this.Success({
      data: resp,
      message: 'User info was read succesfully',
    });
  }

  // Method to UPDATE an existing profile
  async update(authId: string, updateProfileDto: UpdateProfileDto) {
    const EmailResp = await this.getEmailRead(updateProfileDto.email);
    if (EmailResp.data != null) {
      throw new UpdateException('Email exists');
    }

    let resp: object;
    if (updateProfileDto.skills === undefined) {
      // It works
      resp = await this.prismaService.user.update({
        where: { authId },
        // @ts-ignore
        data: updateProfileDto,
      });
      // Magic :)
    } else {
      // @ts-ignore
      const skillArray = updateProfileDto.skills.map((id: any) => ({
        id,
      }));

      resp = await this.prismaService.user.update({
        where: { authId },
        data: {
          ...updateProfileDto,
          skills: { set: skillArray },
        },
      });
    }
    return this.Success({
      data: resp,
      message: 'User info was updated succesfully',
    });
  }
}
