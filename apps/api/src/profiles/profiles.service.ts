import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { CreateException } from './exception/create.exception';
import { UpdateException } from './exception/update.exception';
import { CreateCollegeException } from './exception/create-college.exception';

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
      success: true,
      message: resp.message,
      data: resp.data,
    };
  }

  // Method to CREATE a new profile
  async createUser(createProfileDto: CreateProfileDto) {
    const user = await this.getUserById(createProfileDto.authId);
    const userByEmail = await this.getUserByEmail(createProfileDto.email);
    if (user.data != null) {
      throw new CreateException('User Exists');
    }
    if (userByEmail != null && userByEmail.data != null) {
      throw new CreateException('User with same email exists');
    }
    const skillArray = createProfileDto.skills.map((id: string) => ({
      id,
    }));

    const userData: CreateProfileDto = createProfileDto;

    if (userData.collegeName != null) {
      const collegeDataByName = await this.getCollegeByName(userData.collegeName);
      if (collegeDataByName.data != null) {
        throw new CreateCollegeException('College Exists');
      } else {
        const collegeData = await this.createCollege(userData.collegeName);
        delete userData.collegeName;
        userData.collegeId = collegeData.id;
      }
    }

    const resp = await this.prismaService.user.create({
      data: {
        ...userData,
        skills: { connect: skillArray },
      },
      include: {
        skills: true,
        college: true,
      },
    });

    return this.Success({
      data: resp,
      message: 'User was created succesfully',
    });
  }

  async createCollege(name: string) {
    return this.prismaService.college.create({
      data: {
        name,
      },
    });
  }

  async getCollegeByName(name: string) {
    const resp = await this.prismaService.college.findUnique({
      where: {
        name,
      },
    });
    return this.Success({
      data: resp,
      message: 'User info was read succesfully',
    });
  }

  async getSkillById(id: string) {
    const resp = await this.prismaService.skill.findUnique({
      where: {
        id,
      },
    });
    return this.Success({
      data: resp,
      message: 'User info was read succesfully',
    });
  }

  // Method to READ an existing profile
  async getUserById(authId: string) {
    const resp = await this.prismaService.user.findUnique({
      where: {
        authId,
      },
      include: {
        skills: true,
        college: true,
      },
    });
    return this.Success({
      data: resp,
      message: 'User info was read succesfully',
    });
  }

  // Method to READ an existing profile with Email
  async getUserByEmail(email: string | undefined) {
    if (typeof email === 'undefined') {
      return { data: null };
    }
    const resp = await this.prismaService.user.findUnique({
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
  async updateUser(authId: string, updateProfileDto: UpdateProfileDto) {
    const EmailResp = await this.getUserByEmail(updateProfileDto.email);
    if (EmailResp.data != null) {
      // @ts-ignore
      if (EmailResp.data.authId !== authId) {
        throw new UpdateException('Email exists');
      }
    }

    const userUpdateData: UpdateProfileDto = updateProfileDto;

    if (userUpdateData.collegeName != null) {
      const collegeDataByName = await this.getCollegeByName(userUpdateData.collegeName);
      if (collegeDataByName.data != null) {
        throw new CreateCollegeException('College Exists');
      } else {
        const collegeData = await this.createCollege(userUpdateData.collegeName);
        delete userUpdateData.collegeName;
        userUpdateData.collegeId = collegeData.id;
      }
    }

    let resp: object;
    if (userUpdateData.skills === undefined) {
      // It works
      resp = await this.prismaService.user.update({
        where: { authId },
        // @ts-ignore
        data: userUpdateData,
        include: {
          skills: true,
          college: true,
        },
      });
      // Magic :)
    } else {
      const skillArray = userUpdateData.skills.map((id: any) => ({
        id,
      }));

      resp = await this.prismaService.user.update({
        where: { authId },
        data: {
          ...userUpdateData,
          skills: { set: skillArray },
        },
        include: {
          skills: true,
          college: true,
        },
      });
    }
    return this.Success({
      data: resp,
      message: 'User info was updated succesfully',
    });
  }
}
