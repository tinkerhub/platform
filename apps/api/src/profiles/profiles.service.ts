import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { CreateUserException } from './exception/create.user.exception';
import { UpdateUserException } from './exception/update.user.exception';

interface Response {
  message: string;
  data?: unknown;
}

@Injectable()
export class ProfilesService {
  constructor(private prismaService: PrismaService) {}

  // Response Handler
  Success(response: Response) {
    return {
      success: true,
      message: response.message,
      data: response.data,
    };
  }

  // Method to CREATE a new profile
  async createUser(createUserData: CreateProfileDto) {
    const user = await this.getUserById(createUserData.authId);
    const userByEmail = await this.getUserByEmail(createUserData.email);
    if (user.data !== null) {
      throw new CreateUserException('User Exists');
    }
    if (userByEmail !== null && userByEmail.data !== null) {
      throw new CreateUserException('User with same email exists');
    }
    const skillArray = createUserData.skills.map((id: string) => ({
      id,
    }));

    const createUserResponse = await this.prismaService.user.create({
      data: {
        ...createUserData,
        skills: { connect: skillArray },
      },
      include: {
        skills: true,
        college: true,
      },
    });

    return this.Success({
      data: createUserResponse,
      message: 'User was created succesfully',
    });
  }

  async getSkillById(id: string) {
    const getSkillResponse = await this.prismaService.skill.findUnique({
      where: {
        id,
      },
    });
    return this.Success({
      data: getSkillResponse,
      message: 'skill info was read succesfully',
    });
  }

  // Method to READ an existing profile
  async getUserById(authId: string) {
    const getUserResponse = await this.prismaService.user.findUnique({
      where: {
        authId,
      },
      include: {
        skills: true,
        college: true,
      },
    });
    return this.Success({
      data: getUserResponse,
      message: 'User info was read succesfully',
    });
  }

  // Method to READ an existing profile with Email
  async getUserByEmail(email: string | undefined) {
    if (typeof email === 'undefined') {
      return { data: null };
    }
    const getUserResponse = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
    return this.Success({
      data: getUserResponse,
      message: 'User info was read succesfully',
    });
  }

  // Method to UPDATE an existing profile
  async updateUser(authId: string, updateUserData: UpdateProfileDto) {
    const getUserByEmailResponse = await this.getUserByEmail(updateUserData.email);
    if (getUserByEmailResponse.data != null) {
      // @ts-ignore
      if (getUserByEmailResponse.data.authId !== authId) {
        throw new UpdateUserException('Email exists');
      }
    }

    let updateUserResponse: object;
    if (updateUserData.skills === undefined) {
      // It works
      updateUserResponse = await this.prismaService.user.update({
        where: { authId },
        // @ts-ignore
        data: updateUserData,
        include: {
          skills: true,
          college: true,
        },
      });
      // Magic :)
    } else {
      const skillArray = updateUserData.skills.map((id: any) => ({
        id,
      }));

      updateUserResponse = await this.prismaService.user.update({
        where: { authId },
        data: {
          ...updateUserData,
          skills: { set: skillArray },
        },
        include: {
          skills: true,
          college: true,
        },
      });
    }
    return this.Success({
      data: updateUserResponse,
      message: 'User info was updated succesfully',
    });
  }
}
