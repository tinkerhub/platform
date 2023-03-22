import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

interface Response {
  message: string;
  data?: unknown;
}

@Injectable()
export class NocoService {
  // Response Handler
  Success(response: Response) {
    return {
      success: true,
      message: response.message,
      data: response.data,
    };
  }

  constructor(private prismaService: PrismaService) {}

  // Method to return college names
  async getCollegeName(cname: string, limit: string, page: string) {
    const data = await this.prismaService.college.findMany({
      where: {
        name: {
          contains: cname,
          mode: 'insensitive',
        },
      },
    });

    const startIndex = (parseInt(page, 10) - 1) * parseInt(limit, 10);
    const endIndex = parseInt(page, 10) * parseInt(limit, 10);
    return data.slice(startIndex, endIndex);
  }

  async getSkills(cname: string, limit: string, page: string) {
    const data = await this.prismaService.skill.findMany({
      where: {
        name: {
          contains: cname,
          mode: 'insensitive',
        },
      },
    });

    const startIndex = (parseInt(page, 10) - 1) * parseInt(limit, 10);
    const endIndex = parseInt(page, 10) * parseInt(limit, 10);
    return data.slice(startIndex, endIndex);
  }

  async createCollege(name: string) {
    const createCollegeResponse = await this.prismaService.college.create({
      data: {
        name,
      },
    });

    return this.Success({
      data: createCollegeResponse,
      message: 'college was created succesfully',
    });
  }
}
