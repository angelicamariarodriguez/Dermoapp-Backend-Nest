import { Test, TestingModule } from '@nestjs/testing';
import { PatientService } from './patient.service';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { PatientEntity} from './patient.entity'
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';

describe('PatientService', () => {
  let service: PatientService;
  let repository: Repository<PatientEntity>;
  let patientsList: PatientEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [PatientService],
    }).compile();

    service = module.get<PatientService>(PatientService);
    repository = module.get<Repository<PatientEntity>>(getRepositoryToken(PatientEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    patientsList = [];
    for(let i = 0; i < 5; i++){
        const patient: PatientEntity = await repository.save({
        name: faker.name.fullName(), 
        email: faker.internet.email(),
        password: faker.internet.password(),
        birthDate: faker.date.birthdate(), 
        country: faker.address.country(),
        skinType: faker.color.human(),
        profilePicture: faker.image.imageUrl()})
        patientsList.push(patient);
    }
  }
    
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should return all patients', async () => {
    const patients: PatientEntity[] = await service.findAll();
    expect(patients).not.toBeNull();
    expect(patients).toHaveLength(patientsList.length);
  });

  it('findOne should return a patient by id', async () => {
    const storedPatient: PatientEntity = patientsList[0];
    const patient: PatientEntity = await service.findOne(storedPatient.id);
    expect(patient).not.toBeNull();
    expect(patient.name).toEqual(storedPatient.name)
    expect(patient.email).toEqual(storedPatient.email)
    expect(patient.password).toEqual(storedPatient.password)
    expect(patient.birthDate).toEqual(storedPatient.birthDate)
    expect(patient.country).toEqual(storedPatient.country)
    expect(patient.skinType).toEqual(storedPatient.skinType)
    expect(patient.profilePicture).toEqual(storedPatient.profilePicture)
  });

  it('findOne should throw an exception for an invalid patient', async () => {
    await expect(() => service.findOne("0")).rejects.toHaveProperty("message", "The patient with the given id was not found")
  });

  it('create should return a new patient', async () => {
    const patient: PatientEntity = {
      id: "",
      name: faker.name.fullName(), 
      email: faker.internet.email(),
      password: faker.internet.password(),
      birthDate: faker.date.birthdate(), 
      country: faker.address.country(),
      skinType: faker.color.human(),
      profilePicture: faker.image.imageUrl()
    }

    const newPatient: PatientEntity = await service.create(patient);
    expect(newPatient).not.toBeNull();

    const storedPatient: PatientEntity = await repository.findOne({where: {id: newPatient.id}})
    expect(storedPatient).not.toBeNull();
    expect(storedPatient.name).toEqual(newPatient.name)
    expect(storedPatient.email).toEqual(newPatient.email)
    expect(storedPatient.password).toEqual(newPatient.password)
    expect(storedPatient.birthDate).toEqual(newPatient.birthDate)
    expect(storedPatient.country).toEqual(newPatient.country)
    expect(storedPatient.skinType).toEqual(newPatient.skinType)
    expect(storedPatient.profilePicture).toEqual(newPatient.profilePicture)
  });

  it('update should modify a patient', async () => {
    const patient: PatientEntity = patientsList[0];
    patient.name = "New name";
    patient.profilePicture = "New picture";
  
    const updatedPatient: PatientEntity = await service.update(patient.id, patient);
    expect(updatedPatient).not.toBeNull();
  
    const storedPatient: PatientEntity = await repository.findOne({ where: { id: patient.id } })
    expect(storedPatient).not.toBeNull();
    expect(storedPatient.name).toEqual(patient.name)
    expect(storedPatient.profilePicture).toEqual(patient.profilePicture)
  });
 
  it('update should throw an exception for an invalid patient', async () => {
    let patient: PatientEntity = patientsList[0];
    patient = {
      ...patient, name: "New name", profilePicture: "New picture"
    }
    await expect(() => service.update("0", patient)).rejects.toHaveProperty("message", "The patient with the given id was not found")
  });

  it('delete should remove a patient', async () => {
    const patient: PatientEntity = patientsList[0];
    await service.delete(patient.id);
  
    const deletedPatient: PatientEntity = await repository.findOne({ where: { id: patient.id } })
    expect(deletedPatient).toBeNull();
  });

  it('delete should throw an exception for an invalid patient', async () => {
    const patient: PatientEntity = patientsList[0];
    await service.delete(patient.id);
    await expect(() => service.delete("0")).rejects.toHaveProperty("message", "The patient with the given id was not found")
  });
 
});
