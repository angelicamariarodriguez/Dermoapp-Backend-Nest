import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';
import { ConsultationService } from './consultation.service';
import { ConsultationEntity } from './consultation.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';
import { MedicEntity } from '../medic/medic.entity';
import { PatientEntity } from 'src/patient/patient.entity';

describe('ConsultationService', () => {
  let service: ConsultationService;
  let repository: Repository<ConsultationEntity>;
  let consultationsList: ConsultationEntity[];
  let medicRepository: Repository<MedicEntity>;
  let medicsList: MedicEntity[];
  let patientRepository: Repository<PatientEntity>;
  let patientsList: PatientEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ConsultationService],
    }).compile();

    service = module.get<ConsultationService>(ConsultationService);
    repository = module.get<Repository<ConsultationEntity>>(getRepositoryToken(ConsultationEntity));
    await seedDatabase();
  });
  
  const seedDatabase = async () => {
    repository.clear();
    consultationsList = [];
    for(let i = 0; i < 5; i++){
        const consultation: ConsultationEntity = await repository.save({
        shape: faker.lorem.word(),
        numberOfInjuries: faker.lorem.word(),
        distribution: faker.lorem.word(),
        comment: faker.lorem.paragraph(),
        image: faker.image.imageUrl()})          
    }
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
    const consultation: ConsultationEntity = {
      id: "",
      shape: faker.lorem.word(),
      numberOfInjuries: faker.lorem.word(),
      distribution: faker.lorem.word(),
      comment: faker.lorem.paragraph(),
      image: faker.image.imageUrl(),
      medic: "",
      artworks: []
    }

    const newMuseum: MuseumEntity = await service.create(museum);
    expect(newMuseum).not.toBeNull();

    const storedMuseum: MuseumEntity = await repository.findOne({where: {id: newMuseum.id}})
    expect(storedMuseum).not.toBeNull();
    expect(storedMuseum.name).toEqual(newMuseum.name)
    expect(storedMuseum.description).toEqual(newMuseum.description)
    expect(storedMuseum.address).toEqual(newMuseum.address)
    expect(storedMuseum.city).toEqual(newMuseum.city)
    expect(storedMuseum.image).toEqual(newMuseum.image)
  });

});
