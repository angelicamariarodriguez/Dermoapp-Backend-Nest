import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';
import { SymptomEntity } from './symptom.entity';
import { SymptomService } from './symptom.service';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('SymptomService', () => {
  let service: SymptomService;
  let repository: Repository<SymptomEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [SymptomService],
    }).compile();

    service = module.get<SymptomService>(SymptomService);
    repository = module.get<Repository<SymptomEntity>>(getRepositoryToken(SymptomEntity));
    //await seedDatabase();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
