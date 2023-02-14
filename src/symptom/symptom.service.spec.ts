import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';
import { SymptomEntity } from './symptom.entity';
import { SymptomService } from './symptom.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';

describe('SymptomService', () => {
  let service: SymptomService;
  let repository: Repository<SymptomEntity>;
  let symptomsList: SymptomEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [SymptomService],
    }).compile();

    service = module.get<SymptomService>(SymptomService);
    repository = module.get<Repository<SymptomEntity>>(getRepositoryToken(SymptomEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    symptomsList = [];
    for(let i = 0; i < 5; i++){
        const symptom: SymptomEntity = await repository.save({
        typeOfInjury: faker.lorem.word(), 
        specialty: faker.lorem.word()})
        symptomsList.push(symptom);
    }
  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should return all symptoms', async () => {
    const symptoms: SymptomEntity[] = await service.findAll();
    expect(symptoms).not.toBeNull();
    expect(symptoms).toHaveLength(symptomsList.length);
  });

  it('findOne should return a symptom by id', async () => {
    const storedSymptom: SymptomEntity = symptomsList[0];
    const symptom: SymptomEntity = await service.findOne(storedSymptom.id);
    expect(symptom).not.toBeNull();
    expect(symptom.typeOfInjury).toEqual(storedSymptom.typeOfInjury)
    expect(symptom.specialty).toEqual(storedSymptom.specialty)
  });

  it('findAllBySpecialty should return a all symptoms that belong to an specialty', async () => {
    const storedSymptom: SymptomEntity = symptomsList[0];
    const symptom: SymptomEntity = await service.findOne(storedSymptom.id);
    expect(symptom).not.toBeNull();
    expect(symptom.typeOfInjury).toEqual(storedSymptom.typeOfInjury)
    expect(symptom.specialty).toEqual(storedSymptom.specialty)
  });

  it('findOne should throw an exception for an invalid symptom', async () => {
    await expect(() => service.findOne("0")).rejects.toHaveProperty("message", "The symptom with the given id was not found")
  });

  it('create should return a new symptom', async () => {
    const symptom: SymptomEntity = {
      id: "",
      typeOfInjury: faker.lorem.word(), 
      specialty: faker.lorem.word(), 
      consultations: [],
    }
 
    const newSymptom: SymptomEntity = await service.create(symptom);
    expect(newSymptom).not.toBeNull();
 
    const storedSymptom: SymptomEntity = await repository.findOne({where: {id: newSymptom.id}})
    expect(storedSymptom).not.toBeNull();
    expect(storedSymptom.typeOfInjury).toEqual(newSymptom.typeOfInjury)
    expect(storedSymptom.specialty).toEqual(newSymptom.specialty)
  });

  it('update should modify a symptom', async () => {
    const symptom: SymptomEntity = symptomsList[0];
    symptom.typeOfInjury = "New injury";
    symptom.specialty = "New specialty";
  
    const updatedSymptom: SymptomEntity = await service.update(symptom.id, symptom);
    expect(updatedSymptom).not.toBeNull();
  
    const storedSymptom: SymptomEntity = await repository.findOne({ where: { id: symptom.id } })
    expect(storedSymptom).not.toBeNull();
    expect(storedSymptom.typeOfInjury).toEqual(symptom.typeOfInjury)
    expect(storedSymptom.specialty).toEqual(symptom.specialty)
  });

  it('update should throw an exception for an invalid symptom', async () => {
    let symptom: SymptomEntity = symptomsList[0];
    symptom = {
      ...symptom, typeOfInjury: "New injury", specialty: "New specialty"
    }
    await expect(() => service.update("0", symptom)).rejects.toHaveProperty("message", "The symptom with the given id was not found")
  });

  it('delete should remove a symptom', async () => {
    const symptom: SymptomEntity = symptomsList[0];
    await service.delete(symptom.id);
  
    const deletedSymptom: SymptomEntity = await repository.findOne({ where: { id: symptom.id } })
    expect(deletedSymptom).toBeNull();
  });

  it('delete should throw an exception for an invalid symptom', async () => {
    const symptom: SymptomEntity = symptomsList[0];
    await service.delete(symptom.id);
    await expect(() => service.delete("0")).rejects.toHaveProperty("message", "The symptom with the given id was not found")
  });
});
