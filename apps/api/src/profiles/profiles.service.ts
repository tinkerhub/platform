import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfilesService {
  create(createProfileDto: CreateProfileDto): Profile {
    return { name: createProfileDto.name };
  }

  findAll(): Profile[] {
    return [{ name: 'test' }];
  }

  findOne(id: number): Profile {
    return { name: `test ${id}` };
  }

  update(id: number, updateProfileDto: UpdateProfileDto) {
    return { name: `${updateProfileDto.name} ${id}` };
  }

  remove(id: number): Profile {
    return { name: `test ${id}` };
  }
}
