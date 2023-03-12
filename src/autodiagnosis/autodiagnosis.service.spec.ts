import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { AutodiagnosisModule } from './autodiagnosis.module';
import { AutodiagnosisService } from './autodiagnosis.service';
import { ConsultationService } from '../consultation/consultation.service';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { ConsultationEntity } from '../consultation/consultation.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

describe('AutodiagnosisService', () => {
  let service: AutodiagnosisService;
  let repository: Repository<ConsultationEntity>;
  let consultationsList: ConsultationEntity[];
  let consultationRepository: Repository<ConsultationEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AutodiagnosisService, ConsultationService],
      imports: [...TypeOrmTestingConfig()],
    }).compile();

    service = module.get<AutodiagnosisService>(AutodiagnosisService);
    repository = module.get<Repository<ConsultationEntity>>(getRepositoryToken(ConsultationEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();

    consultationsList = [];
    for (let i = 0; i < 2; i++) {
      const consultation: ConsultationEntity = await repository.save({
        shape: faker.lorem.word(),
        numberOfInjuries: faker.lorem.word(),
        distribution: faker.lorem.word(),
        comment: faker.lorem.paragraph(),
        image: faker.image.imageUrl(),
        creationDate:faker.date.birthdate().toISOString(),
        typeOfInjury: faker.lorem.word(),
        specialty: faker.lorem.word(),
        diagnosis: "",
        asigned: false,
        acceptDiagnosis: "no"
      });
      consultationsList.push(consultation);
    }
  }


  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should make autodignosis', async () => {
    const storedConsultation: ConsultationEntity = consultationsList[0];
    const response = await service.createCompletion({
      question: 'roses are red',
      consultationId: storedConsultation.id
    });
    expect(response.diagnosis).not.toBeNull();
  });


 it('createCompletion should throw an exception for an invalid consultation', async () => {
    await expect(() => service.createCompletion({question: 'roses are red', consultationId: "0"})).rejects.toThrowError()
    //toHaveProperty("message", "The consultation with the given id was not found or autodiagnosis unavailable")
  });


});
