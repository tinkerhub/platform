import { Injectable } from '@nestjs/common';
import { readFileSync } from 'node:fs';
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
    const ReadResp = await this.read(createProfileDto.authid);
    const EmailResp = await this.EmailRead(createProfileDto.email);
    if (ReadResp.data != null) {
      throw new CreateException('User Exists');
    }
    if (EmailResp != null && EmailResp.data != null) {
      throw new CreateException('User with same email exists');
    }
    const resp = await this.prismaService.user.create({
      data: createProfileDto,
    });
    return this.Success({
      data: resp,
      message: 'User was created succesfully',
    });
  }

  // Method to READ an existing profile
  async read(authid: string) {
    const resp = await this.prismaService.user.findFirst({
      where: {
        authid,
      },
    });
    return this.Success({
      data: resp,
      message: 'User info was read succesfully',
    });
  }

  // Method to READ an existing profile with Email
  async EmailRead(email: string | undefined) {
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
  async update(authid: string, updateProfileDto: UpdateProfileDto) {
    const EmailResp = await this.EmailRead(updateProfileDto.email);
    if (EmailResp.data != null) {
      throw new UpdateException('Email exists');
    }

    // It works
    const resp = await this.prismaService.user.update({
      where: { authid },
      data: updateProfileDto,
    });
    // Magic :)

    return this.Success({
      data: resp,
      message: 'User info was updated succesfully',
    });
  }

  collegeName() {
    const data = readFileSync('./src/profiles/data.json', { encoding: 'utf8' });
    const parseData = JSON.parse(data);
    const collegeJSON = { data: [] };
    for (let key = 0; key < parseData.length; key += 1) {
      const collegeName = parseData[key].name;
      // @ts-ignore
      collegeJSON.data.push({ name: collegeName });
    }
    return collegeJSON;
  }
}
