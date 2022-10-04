import { Test, TestingModule } from '@nestjs/testing';
import { CollegeService } from './college.service';

describe('CollegeService', () => {
  let service: CollegeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CollegeService],
    }).compile();

    service = module.get<CollegeService>(CollegeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
