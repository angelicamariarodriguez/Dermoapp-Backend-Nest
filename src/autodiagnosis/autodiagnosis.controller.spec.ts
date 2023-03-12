import { Test, TestingModule } from '@nestjs/testing';
import { AutodiagnosisController } from './autodiagnosis.controller';
import { AutodiagnosisService } from './autodiagnosis.service';
import { ConsultationService } from '../consultation/consultation.service';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { ConsultationEntity } from '../consultation/consultation.entity';
import { Repository } from 'typeorm';

describe('AutodiagnosisController', () => {
  let controller: AutodiagnosisController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AutodiagnosisController],
      providers: [AutodiagnosisService, ConsultationService],
      imports: [...TypeOrmTestingConfig()],
    }).compile();

    controller = module.get<AutodiagnosisController>(AutodiagnosisController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});