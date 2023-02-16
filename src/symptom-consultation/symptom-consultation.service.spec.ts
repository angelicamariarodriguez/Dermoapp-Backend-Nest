import { Test, TestingModule } from '@nestjs/testing';
import { ConsultationEntity } from '../consultation/consultation.entity';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { SymptomEntity } from '../symptom/symptom.entity';
import { Repository } from 'typeorm';
import { SymptomConsultationService } from './symptom-consultation.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MedicEntity } from '../medic/medic.entity';
import { faker } from '@faker-js/faker';

describe('SymptomConsultationService', () => {
  let service: SymptomConsultationService;
  let symptomRepository: Repository<SymptomEntity>;
  let consultationRepository: Repository<ConsultationEntity>;
  let symptomsList: SymptomEntity[];
  let consultationsList: ConsultationEntity[];
  let medic: MedicEntity;
  let medicRepository: Repository<MedicEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [SymptomConsultationService],
    }).compile();

    service = module.get<SymptomConsultationService>(SymptomConsultationService);
    symptomRepository = module.get<Repository<SymptomEntity>>(getRepositoryToken(SymptomEntity));
    consultationRepository = module.get<Repository<ConsultationEntity>>(getRepositoryToken(ConsultationEntity));
    medicRepository = module.get<Repository<MedicEntity>>(getRepositoryToken(MedicEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    symptomRepository.clear();
    consultationRepository.clear();
    symptomsList = [];
    consultationsList =[];

    for (let i = 0; i < 2; i++) {
      const consultation: ConsultationEntity = await consultationRepository.save({
        shape: faker.lorem.word(),
        numberOfInjuries: faker.lorem.word(),
        distribution: faker.lorem.word(),
        comment: faker.lorem.word(),
        image: faker.image.imageUrl()
      });
      consultationsList.push(consultation);
    }
    
    for(let i = 0; i < 1; i++){
        const symptom: SymptomEntity = await symptomRepository.save({
        typeOfInjury: faker.lorem.word(), 
        specialty: "specialty1",
        consultations: consultationsList
      })
        symptomsList.push(symptom);
    }

    for(let i = 0; i < 2; i++){
      const symptom: SymptomEntity = await symptomRepository.save({
      typeOfInjury: faker.lorem.word(), 
      specialty: "specialty2"})
      symptomsList.push(symptom);
    }


    medic = await medicRepository.save({
      name: faker.name.firstName(), 
      lastName: faker.name.lastName(), 
      country: faker.lorem.word(), 
      profLicense: faker.lorem.sentence(),
      email: faker.internet.email(),
      password: faker.internet.password(), 
      specialty: "specialty1", 
      profilePicture: faker.image.imageUrl()
    });
  }


  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('addConsultatioSymptom should add a consultation to a symptom', async () => {
    const newConsultation: ConsultationEntity = await consultationRepository.save({
      shape: faker.lorem.word(),
      numberOfInjuries: faker.lorem.word(),
      distribution: faker.lorem.word(),
      comment: faker.lorem.paragraph(),
      image: faker.image.imageUrl()
    });

    const newSymptom: SymptomEntity = await symptomRepository.save({
      typeOfInjury: faker.lorem.word(), 
      specialty: "test"
    })

    const result: SymptomEntity = await service.addConsultationSymptom(newSymptom.id, newConsultation.id);
    
    expect(result.consultations.length).toBe(1);
    expect(result.consultations[0]).not.toBeNull();
    expect(result.consultations[0].shape).toBe(newConsultation.shape)
    expect(result.consultations[0].numberOfInjuries).toBe(newConsultation.numberOfInjuries)
    expect(result.consultations[0].distribution).toBe(newConsultation.distribution)
    expect(result.consultations[0].comment).toBe(newConsultation.comment)
    expect(result.consultations[0].image).toBe(newConsultation.image)

  });

  it('findConsultationsBySpecialty should return consultations by specialty', async () => {
    const storedConsultations: ConsultationEntity[] = await service.findConsultationsBySpecialty(medic.specialty)

    expect(storedConsultations).not.toBeNull();
    //expect(storedConsultations).toHaveLength(4);
    expect(storedConsultations[0].id).toBe(consultationsList[0].id);
    expect(storedConsultations[1].id).toBe(consultationsList[1].id);
    //expect(storedConsultations[3].id).toBe(consultationsList[0].id);
    //expect(storedConsultations[4].id).toBe(consultationsList[1].id);

  });
});
