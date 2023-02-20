import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { MedicEntity } from './medic.entity';
import { MedicService } from './medic.service';
import { faker } from '@faker-js/faker';


describe('MedicService', () => {
  let service: MedicService;
  let repository: Repository<MedicEntity>;
  let medicsList: MedicEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [MedicService],
    }).compile();

    service = module.get<MedicService>(MedicService);
    repository = module.get<Repository<MedicEntity>>(getRepositoryToken(MedicEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    medicsList = [];
    for(let i = 0; i < 5; i++){
        const medic: MedicEntity = await repository.save({
        name: faker.name.firstName(), 
        lastName: faker.name.lastName(), 
        country: faker.lorem.word(), 
        profLicense: faker.lorem.sentence(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        specialty: faker.lorem.word(), 
        profilePicture: faker.image.imageUrl()})
        medicsList.push(medic);
    }
  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should return all medics', async () => {
    const medics: MedicEntity[] = await service.findAll();
    expect(medics).not.toBeNull();
    expect(medics).toHaveLength(medicsList.length);
  });

  it('findOne should return a medic by id', async () => {
    const storedMedic: MedicEntity = medicsList[0];
    const medic: MedicEntity = await service.findOne(storedMedic.id);
    expect(medic).not.toBeNull();
    expect(medic.name).toEqual(storedMedic.name)
    expect(medic.lastName).toEqual(storedMedic.lastName)
    expect(medic.country).toEqual(storedMedic.country)
    expect(medic.profLicense).toEqual(storedMedic.profLicense)
    expect(medic.profilePicture).toEqual(storedMedic.profilePicture)
    expect(medic.email).toEqual(storedMedic.email)
    expect(medic.password).toEqual(storedMedic.password)
    expect(medic.specialty).toEqual(storedMedic.specialty)
  });

  it('findOne should throw an exception for an invalid medic', async () => {
    await expect(() => service.findOne("0")).rejects.toHaveProperty("message", "The medic with the given id was not found")
  });

  it('create should return a new medic', async () => {
    const medic: MedicEntity = {
      id: "",
      name: faker.name.firstName(), 
      lastName: faker.name.lastName(), 
      country: faker.lorem.word(), 
      profLicense: faker.lorem.sentence(),
      email: faker.internet.email(),
      password: faker.internet.password(), 
      specialty: faker.lorem.word(), 
      profilePicture: faker.image.imageUrl(),
      consultations: [],
    }
 
    const newMedic: MedicEntity = await service.create(medic);
    expect(newMedic).not.toBeNull();
 
    const storedMedic: MedicEntity = await repository.findOne({where: {id: newMedic.id}})
    expect(storedMedic).not.toBeNull();
    expect(storedMedic.name).toEqual(newMedic.name)
    expect(storedMedic.lastName).toEqual(newMedic.lastName)
    expect(storedMedic.country).toEqual(newMedic.country)
    expect(storedMedic.profLicense).toEqual(newMedic.profLicense)
    expect(storedMedic.profilePicture).toEqual(newMedic.profilePicture)
    expect(storedMedic.email).toEqual(newMedic.email)
    expect(storedMedic.password).toEqual(newMedic.password)
    expect(storedMedic.specialty).toEqual(newMedic.specialty)
  });

  it('update should modify a medic', async () => {
    const medic: MedicEntity = medicsList[0];
    medic.name = "New name";
    medic.country = "New country";
  
    const updatedMedic: MedicEntity = await service.update(medic.id, medic);
    expect(updatedMedic).not.toBeNull();
  
    const storedMedic: MedicEntity = await repository.findOne({ where: { id: medic.id } })
    expect(storedMedic).not.toBeNull();
    expect(storedMedic.name).toEqual(medic.name)
    expect(storedMedic.country).toEqual(medic.country)
  });

  it('update should throw an exception for an invalid medic', async () => {
    let medic: MedicEntity = medicsList[0];
    medic = {
      ...medic, name: "New name", country: "New country"
    }
    await expect(() => service.update("0", medic)).rejects.toHaveProperty("message", "The medic with the given id was not found")
  });

  it('delete should remove a medic', async () => {
    const medic: MedicEntity = medicsList[0];
    await service.delete(medic.id);
  
    const deletedMedic: MedicEntity = await repository.findOne({ where: { id: medic.id } })
    expect(deletedMedic).toBeNull();
  });

  it('delete should throw an exception for an invalid medic', async () => {
    const medic: MedicEntity = medicsList[0];
    await service.delete(medic.id);
    await expect(() => service.delete("0")).rejects.toHaveProperty("message", "The medic with the given id was not found")
  });

  it('findOneByEmail should return a medic by email', async () => {
    const storedMedic: MedicEntity = medicsList[0];
    const medic: MedicEntity = await service.findOneByEmail(storedMedic.email);
    expect(medic).not.toBeNull();
    expect(medic.name).toEqual(storedMedic.name)
    expect(medic.lastName).toEqual(storedMedic.lastName)
    expect(medic.country).toEqual(storedMedic.country)
    expect(medic.profLicense).toEqual(storedMedic.profLicense)
    expect(medic.profilePicture).toEqual(storedMedic.profilePicture)
    expect(medic.email).toEqual(storedMedic.email)
    expect(medic.password).toEqual(storedMedic.password)
    expect(medic.specialty).toEqual(storedMedic.specialty)
  });

});
