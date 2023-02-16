import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NocoService {
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
}
