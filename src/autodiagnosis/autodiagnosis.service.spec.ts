import { Test, TestingModule } from '@nestjs/testing';
import { AutodiagnosisService } from './autodiagnosis.service';

describe('AutodiagnosisService', () => {
  let service: AutodiagnosisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AutodiagnosisService],
    }).compile();

    service = module.get<AutodiagnosisService>(AutodiagnosisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
