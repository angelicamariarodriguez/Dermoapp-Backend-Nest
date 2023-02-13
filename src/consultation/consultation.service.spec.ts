import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';
import { ConsultationService } from './consultation.service';
import { ConsultationEntity } from './consultation.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';
import { MedicEntity } from '../medic/medic.entity';
import { PatientEntity } from '../patient/patient.entity';
import { SymptomEntity } from '../symptom/symptom.entity';

describe('ConsultationService', () => {
  let service: ConsultationService;
  let repository: Repository<ConsultationEntity>;
  let consultationsList: ConsultationEntity[];
  let medicRepository: Repository<MedicEntity>;
  let medicsList: MedicEntity[];
  let patientRepository: Repository<PatientEntity>;
  let patientsList: PatientEntity[];
  let symptomRepository: Repository<SymptomEntity>;
  let symptomsList: SymptomEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ConsultationService],
    }).compile();

    service = module.get<ConsultationService>(ConsultationService);
    repository = module.get<Repository<ConsultationEntity>>(getRepositoryToken(ConsultationEntity));
    medicRepository = module.get<Repository<MedicEntity>>(getRepositoryToken(MedicEntity));
    patientRepository = module.get<Repository<PatientEntity>>(getRepositoryToken(PatientEntity));
    symptomRepository = module.get<Repository<SymptomEntity>>(getRepositoryToken(SymptomEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    medicRepository.clear();
    patientRepository.clear();
    symptomRepository.clear();
    consultationsList = [];
    medicsList = [];
    patientsList = [];
    symptomsList = [];
    for (let i = 0; i < 5; i++) {
      const consultation: ConsultationEntity = await repository.save({
        shape: faker.lorem.word(),
        numberOfInjuries: faker.lorem.word(),
        distribution: faker.lorem.word(),
        comment: faker.lorem.paragraph(),
        image: faker.image.imageUrl()
      });
      consultationsList.push(consultation);
    }
    const medic: MedicEntity = await medicRepository.save({
      name: faker.name.firstName(), 
      lastName: faker.name.lastName(), 
      country: faker.lorem.word(), 
      profLicense: faker.lorem.sentence(),
      email: faker.internet.email(),
      password: faker.internet.password(), 
      specialty: faker.lorem.word(), 
      profilePicture: faker.image.imageUrl()
    });
    medicsList.push(medic);

    const patient: PatientEntity = await patientRepository.save({
      name: faker.name.fullName(), 
      email: faker.internet.email(),
      password: faker.internet.password(),
      birthDate: faker.date.birthdate(), 
      country: faker.address.country(),
      skinType: faker.color.human(),
      profilePicture: faker.image.imageUrl()
    });
    patientsList.push(patient);

    const symptom: SymptomEntity = await symptomRepository.save({
      typeOfInjury: faker.lorem.word(), 
      specialty: faker.lorem.word()
    });
    symptomsList.push(symptom);
  };


  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should return all consultations', async () => {
    const consultations: ConsultationEntity[] = await service.findAll();
    expect(consultations).not.toBeNull();
    expect(consultations).toHaveLength(consultationsList.length);
  });

  it('findOne should return a consultation by id', async () => {
    const storedConsultation: ConsultationEntity = consultationsList[0];
    const consultation: ConsultationEntity = await service.findOne(storedConsultation.id);
    expect(consultation).not.toBeNull();
    expect(consultation.shape).toEqual(storedConsultation.shape)
    expect(consultation.numberOfInjuries).toEqual(storedConsultation.numberOfInjuries)
    expect(consultation.distribution).toEqual(storedConsultation.distribution)
    expect(consultation.comment).toEqual(storedConsultation.comment)
    expect(consultation.image).toEqual(storedConsultation.image)
  });

  it('findOne should throw an exception for an invalid consultation', async () => {
    await expect(() => service.findOne("0")).rejects.toHaveProperty("message", "The consultation with the given id was not found")
  });

  it('create should return a new consultation', async () => {
    const storedMedic: MedicEntity = medicsList[0];
    const storedPatient: PatientEntity = patientsList[0];
    const storedSymptom: SymptomEntity = symptomsList[0];
  
    const consultation: ConsultationEntity = {
      id: "",
      shape: faker.lorem.word(),
      numberOfInjuries: faker.lorem.word(),
      distribution: faker.lorem.word(),
      comment: faker.lorem.paragraph(),
      image: faker.image.imageUrl(),
      medic: storedMedic,
      patient: storedPatient,
      symptom: storedSymptom

    }

    const newConsultation: ConsultationEntity = await service.create(consultation);
    expect(newConsultation).not.toBeNull();

    const storedConsultation: ConsultationEntity = await repository.findOne({where: {id: newConsultation.id}})
    expect(storedConsultation).not.toBeNull();
    expect(storedConsultation.shape).toEqual(newConsultation.shape)
    expect(storedConsultation.numberOfInjuries).toEqual(newConsultation.numberOfInjuries)
    expect(storedConsultation.distribution).toEqual(newConsultation.distribution)
    expect(storedConsultation.comment).toEqual(newConsultation.comment)
    expect(storedConsultation.image).toEqual(newConsultation.image)
  });

});
