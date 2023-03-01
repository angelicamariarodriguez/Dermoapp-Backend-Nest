import { Test, TestingModule } from '@nestjs/testing';
import { ConsultationEntity } from '../consultation/consultation.entity';
import { MedicEntity } from '../medic/medic.entity';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';
import { MedicConsultationsService } from './medic-consultations.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';

describe('MedicConsultationsService', () => {
  let service: MedicConsultationsService;
  let medicRepository: Repository<MedicEntity>;
  let consultationRepository: Repository<ConsultationEntity>;
  let medic: MedicEntity;
  let consultationsList : ConsultationEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [MedicConsultationsService],
    }).compile();

    service = module.get<MedicConsultationsService>(MedicConsultationsService);
    medicRepository = module.get<Repository<MedicEntity>>(getRepositoryToken(MedicEntity));
    consultationRepository = module.get<Repository<ConsultationEntity>>(getRepositoryToken(ConsultationEntity));

    await seedDatabase();
  });

  const seedDatabase = async () => {
    consultationRepository.clear();
    medicRepository.clear();

    consultationsList = [];
    for(let i = 0; i < 5; i++){
        const consultation: ConsultationEntity = await consultationRepository.save({
          shape: faker.lorem.word(),
          numberOfInjuries: faker.lorem.word(),
          distribution: faker.lorem.word(),
          comment: faker.lorem.paragraph(),
          image: faker.image.imageUrl(),
          creationDate:faker.date.birthdate().toISOString(),
          typeOfInjury: faker.lorem.word(),
          specialty: faker.lorem.word(),
          diagnosis: faker.lorem.paragraph(),
          asigned: false,
          acceptDiagnosis: false
        })
        consultationsList.push(consultation);
    }

    medic = await medicRepository.save({
      name: faker.name.firstName(), 
      lastName: faker.name.lastName(), 
      country: faker.lorem.word(), 
      profLicense: faker.lorem.sentence(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      specialty: faker.lorem.word(), 
      profilePicture: faker.image.imageUrl(),
      consultations: consultationsList
    })
  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('addConsultationToMedic should add an consultation to a medic', async () => {
    const newConsultation: ConsultationEntity = await consultationRepository.save({
      shape: faker.lorem.word(),
      numberOfInjuries: faker.lorem.word(),
      distribution: faker.lorem.word(),
      comment: faker.lorem.paragraph(),
      image: faker.image.imageUrl(),
      creationDate:faker.date.birthdate().toISOString(),
      typeOfInjury: faker.lorem.word(),
      specialty: faker.lorem.word(),
      diagnosis: faker.lorem.paragraph(),
      asigned: false,
      acceptDiagnosis: false
    });

    const newMedic: MedicEntity = await medicRepository.save({
      name: faker.name.firstName(), 
      lastName: faker.name.lastName(), 
      country: faker.lorem.word(), 
      profLicense: faker.lorem.sentence(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      specialty: faker.lorem.word(), 
      profilePicture: faker.image.imageUrl()
    })

    const result: MedicEntity = await service.addConsultationToMedic(newMedic.id, newConsultation.id);
    
    expect(result.consultations.length).toBe(1);
    expect(result.consultations[0]).not.toBeNull();
    expect(result.consultations[0].shape).toBe(newConsultation.shape)
    expect(result.consultations[0].numberOfInjuries).toBe(newConsultation.numberOfInjuries)
    expect(result.consultations[0].distribution).toBe(newConsultation.distribution)
    expect(result.consultations[0].comment).toBe(newConsultation.comment)
    expect(result.consultations[0].image).toBe(newConsultation.image)
    expect(result.consultations[0].diagnosis).toBe(newConsultation.diagnosis)
    expect(result.consultations[0].asigned).toBe(true)
    expect(result.consultations[0].acceptDiagnosis).toBe(newConsultation.acceptDiagnosis)
  });

  it('addConsultationToMedic should thrown exception for an invalid consultation', async () => {
    const newMedic: MedicEntity = await medicRepository.save({
      name: faker.name.firstName(), 
      lastName: faker.name.lastName(), 
      country: faker.lorem.word(), 
      profLicense: faker.lorem.sentence(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      specialty: faker.lorem.word(), 
      profilePicture: faker.image.imageUrl()
    })

    await expect(() => service.addConsultationToMedic(newMedic.id, "0")).rejects.toHaveProperty("message", "The consultation with the given id was not found");
  });

  it('addConsultationToMedic should throw an exception for an invalid medic', async () => {
    const newConsultation: ConsultationEntity = await consultationRepository.save({
      shape: faker.lorem.word(),
      numberOfInjuries: faker.lorem.word(),
      distribution: faker.lorem.word(),
      comment: faker.lorem.paragraph(),
      image: faker.image.imageUrl(),
      creationDate:faker.date.birthdate().toISOString(),
      typeOfInjury: faker.lorem.word(),
      specialty: faker.lorem.word(),
      diagnosis: faker.lorem.paragraph(),
      asigned: false,
      acceptDiagnosis: false
    });

    await expect(() => service.addConsultationToMedic("0", newConsultation.id)).rejects.toHaveProperty("message", "The medic with the given id was not found");
  });

  it('findConsultationsByMedicId should return consultations by medic', async ()=>{
    const consultations: ConsultationEntity[] = await service.findConsultationsByMedicId(medic.id);
    expect(consultations.length).toBe(5)
  });

  it('findConsultationsByMedicId should throw an exception for an invalid medic', async () => {
    await expect(()=> service.findConsultationsByMedicId("0")).rejects.toHaveProperty("message", "The medic with the given id was not found"); 
  });


});
