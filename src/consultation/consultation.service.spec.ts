import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';
import { ConsultationService } from './consultation.service';
import { ConsultationEntity } from './consultation.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';
import { MedicEntity } from '../medic/medic.entity';
import { PatientEntity } from '../patient/patient.entity';


describe('ConsultationService', () => {
  let service: ConsultationService;
  let repository: Repository<ConsultationEntity>;
  let consultationsList: ConsultationEntity[];
  let medicRepository: Repository<MedicEntity>;
  let medic: MedicEntity;
  let patientRepository: Repository<PatientEntity>;
  let patient: PatientEntity;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ConsultationService],
    }).compile();

    service = module.get<ConsultationService>(ConsultationService);
    repository = module.get<Repository<ConsultationEntity>>(getRepositoryToken(ConsultationEntity));
    medicRepository = module.get<Repository<MedicEntity>>(getRepositoryToken(MedicEntity));
    patientRepository = module.get<Repository<PatientEntity>>(getRepositoryToken(PatientEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    medicRepository.clear();
    patientRepository.clear();
    consultationsList = [];
    for (let i = 0; i < 5; i++) {
      const consultation: ConsultationEntity = await repository.save({
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
        acceptDiagnosis: "no"
      });
      consultationsList.push(consultation);
    }

    for (let i = 0; i < 2; i++) {
      const consultation: ConsultationEntity = await repository.save({
        shape: faker.lorem.word(),
        numberOfInjuries: faker.lorem.word(),
        distribution: faker.lorem.word(),
        comment: faker.lorem.paragraph(),
        image: faker.image.imageUrl(),
        creationDate:faker.date.birthdate().toISOString(),
        typeOfInjury: faker.lorem.word(),
        specialty: "specialty1",
        diagnosis: faker.lorem.paragraph(),
        asigned: false,
        acceptDiagnosis: "no"
      });
      consultationsList.push(consultation);
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

    patient = await patientRepository.save({
      name: faker.name.fullName(), 
      email: faker.internet.email(),
      password: faker.internet.password(),
      birthDate: faker.date.birthdate().toISOString(), 
      country: faker.address.country(),
      skinType: faker.color.human(),
      profilePicture: faker.image.imageUrl()
    });

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
    expect(consultation.creationDate).toEqual(storedConsultation.creationDate)
    expect(consultation.typeOfInjury).toEqual(storedConsultation.typeOfInjury)
    expect(consultation.specialty).toEqual(storedConsultation.specialty)
    expect(consultation.diagnosis).toEqual(storedConsultation.diagnosis)
    expect(consultation.asigned).toEqual(storedConsultation.asigned)
    expect(consultation.acceptDiagnosis).toEqual(storedConsultation.acceptDiagnosis)
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
      creationDate:faker.date.birthdate().toISOString(),
      medic: medic,
      patient: patient,
      typeOfInjury: faker.lorem.word(),
      specialty: faker.lorem.word(),
      diagnosis: faker.lorem.paragraph(),
      asigned: true,
      acceptDiagnosis: "no"
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
    expect(storedConsultation.creationDate).toEqual(newConsultation.creationDate)
    expect(storedConsultation.typeOfInjury).toEqual(newConsultation.typeOfInjury)
    expect(storedConsultation.specialty).toEqual(newConsultation.specialty)
    expect(storedConsultation.diagnosis).toEqual(newConsultation.diagnosis)
    expect(storedConsultation.asigned).toEqual(false)
    expect(storedConsultation.acceptDiagnosis).toEqual(newConsultation.acceptDiagnosis)
  });

  it('findAllBySpecialty should return all consultations that belong to a specialty', async () => {
   
    const consultatios: ConsultationEntity[] = await service.findAllBySpecialty(medic.specialty);
    expect(consultatios).not.toBeNull();
    expect(consultatios).toHaveLength(2);
  });

  it('findAllBySpecialty should throw an exception for an invalid specialty', async () => {
    await expect(() => service.findAllBySpecialty("x")).rejects.toHaveProperty("message", "There are not consultations for the given specialty")
  });

  it('update should modify a consultation', async () => {
    const consultation: ConsultationEntity = consultationsList[0];
    consultation.diagnosis = "New diagnosis";
     const updatedConsultation: ConsultationEntity = await service.update(consultation.id, consultation);
    expect(updatedConsultation).not.toBeNull();
    const storedConsultation: ConsultationEntity = await repository.findOne({ where: { id: consultation.id } })
    expect(storedConsultation).not.toBeNull();
    expect(storedConsultation.diagnosis).toEqual(consultation.diagnosis)
  });

  it('update should throw an exception for an invalid consultation', async () => {
    let consultation: ConsultationEntity = consultationsList[0];
    consultation = {
      ...consultation, diagnosis: "New diagnosis"
    }
    await expect(() => service.update("0", consultation)).rejects.toHaveProperty("message", "The consultation with the given id was not found")
  });

  it('update should modify a consultation', async () => {
    const consultation: ConsultationEntity = consultationsList[0];
    consultation.acceptDiagnosis = "yes";
     const updatedConsultation: ConsultationEntity = await service.update(consultation.id, consultation);
    expect(updatedConsultation).not.toBeNull();
    const storedConsultation: ConsultationEntity = await repository.findOne({ where: { id: consultation.id } })
    expect(storedConsultation).not.toBeNull();
    expect(storedConsultation.acceptDiagnosis).toEqual("yes")
  });

  it('update should not  modify the asigned atribut false', async () => {
    const consultation: ConsultationEntity = consultationsList[0];
    consultation.diagnosis = "New diagnosis";
     const updatedConsultation: ConsultationEntity = await service.update(consultation.id, consultation);
    expect(updatedConsultation).not.toBeNull();
    const storedConsultation: ConsultationEntity = await repository.findOne({ where: { id: consultation.id } })
    expect(storedConsultation).not.toBeNull();
    expect(storedConsultation.diagnosis).toEqual(consultation.diagnosis)
    expect(storedConsultation.asigned).toBe(false)
  });
 

});
