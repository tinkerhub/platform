import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NocoService {
  constructor(private prismaService: PrismaService) {}

  // Method to return college names
  async collegeName(cname: string, limit: string, page: string) {
    const data = await this.prismaService.college.findMany({
      where: {
        name: {
          contains: cname,
        },
      },
    });

    const startIndex = (parseInt(page, 10) - 1) * parseInt(limit, 10);
    const endIndex = parseInt(page, 10) * parseInt(limit, 10);
    return data.slice(startIndex, endIndex);
  }

  async skills(cname: string, limit: string, page: string) {
    const data2 = await this.prismaService.skill.create({
      data: {
        id: '12345',
        name: 'TypeScript',
      },
    });
    return { cname, limit, page, data2 };
  }
}
