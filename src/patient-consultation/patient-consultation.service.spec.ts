/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { ConsultationEntity } from '../consultation/consultation.entity';
import { Repository } from 'typeorm';
import { PatientEntity } from '../patient/patient.entity';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { PatientConsultationService } from './patient-consultation.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';

describe('PatientConsultationService', () => {
  let service: PatientConsultationService;
  let patientRepository: Repository<PatientEntity>;
  let consultationRepository: Repository<ConsultationEntity>;
  let patient: PatientEntity;
  let consultationsList : ConsultationEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [PatientConsultationService],
    }).compile();

    service = module.get<PatientConsultationService>(PatientConsultationService);
    patientRepository = module.get<Repository<PatientEntity>>(getRepositoryToken(PatientEntity));
    consultationRepository = module.get<Repository<ConsultationEntity>>(getRepositoryToken(ConsultationEntity));

    await seedDatabase();
  });

  const seedDatabase = async () => {
    consultationRepository.clear();
    patientRepository.clear();

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
          acceptDiagnosis: "no"
        })
        consultationsList.push(consultation);
    }

    patient = await patientRepository.save({
      name: faker.name.fullName(), 
      email: faker.internet.email(),
      password: faker.internet.password(),
      birthDate: faker.date.birthdate().toISOString(), 
      country: faker.address.country(),
      skinType: faker.color.human(),
      profilePicture: faker.image.imageUrl(),
      consultations: consultationsList
    })
  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('addConsultationPatient should add an consultation to a patient', async () => {
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
      acceptDiagnosis: "no"
    });

    const newPatient: PatientEntity = await patientRepository.save({
      name: faker.name.fullName(), 
      email: faker.internet.email(),
      password: faker.internet.password(),
      birthDate: faker.date.birthdate().toISOString(), 
      country: faker.address.country(),
      skinType: faker.color.human(),
      profilePicture: faker.image.imageUrl()
    })

    const result: PatientEntity = await service.addConsultationPatient(newPatient.id, newConsultation.id);
    
    expect(result.consultations.length).toBe(1);
    expect(result.consultations[0]).not.toBeNull();
    expect(result.consultations[0].shape).toBe(newConsultation.shape)
    expect(result.consultations[0].numberOfInjuries).toBe(newConsultation.numberOfInjuries)
    expect(result.consultations[0].distribution).toBe(newConsultation.distribution)
    expect(result.consultations[0].comment).toBe(newConsultation.comment)
    expect(result.consultations[0].image).toBe(newConsultation.image)
    expect(result.consultations[0].diagnosis).toBe(newConsultation.diagnosis)
    expect(result.consultations[0].asigned).toBe(newConsultation.asigned)
    expect(result.consultations[0].acceptDiagnosis).toBe(newConsultation.acceptDiagnosis)
  });

  it('addConsultationPatient should thrown exception for an invalid consultation', async () => {
    const newPatient: PatientEntity = await patientRepository.save({
      name: faker.name.fullName(), 
      email: faker.internet.email(),
      password: faker.internet.password(),
      birthDate: faker.date.birthdate().toISOString(), 
      country: faker.address.country(),
      skinType: faker.color.human(),
      profilePicture: faker.image.imageUrl()
    })

    await expect(() => service.addConsultationPatient(newPatient.id, "0")).rejects.toHaveProperty("message", "The consultation with the given id was not found");
  });

  it('addConsultationPatient should throw an exception for an invalid patient', async () => {
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
      acceptDiagnosis: "no"
    });

    await expect(() => service.addConsultationPatient("0", newConsultation.id)).rejects.toHaveProperty("message", "The patient with the given id was not found");
  });

  it('findConsultationByPatientIdConsultationId should return consultation by patient', async () => {
    const consultation: ConsultationEntity = consultationsList[0];
    const storedConsultation: ConsultationEntity = await service.findConsultationByPatientIdConsultationId(patient.id, consultation.id, )
    expect(storedConsultation).not.toBeNull();
    expect(storedConsultation.shape).toBe(consultation.shape);
    expect(storedConsultation.numberOfInjuries).toBe(consultation.numberOfInjuries);
    expect(storedConsultation.distribution).toBe(consultation.distribution);
    expect(storedConsultation.comment).toBe(consultation.comment);
    expect(storedConsultation.image).toBe(consultation.image);
    expect(storedConsultation.diagnosis).toBe(consultation.diagnosis);
    expect(storedConsultation.asigned).toBe(consultation.asigned);
    expect(storedConsultation.acceptDiagnosis).toBe(consultation.acceptDiagnosis);
  });

  it('findConsultationByPatientIdConsultationId should throw an exception for an invalid consultation', async () => {
    await expect(()=> service.findConsultationByPatientIdConsultationId(patient.id, "0")).rejects.toHaveProperty("message", "The consultation with the given id was not found"); 
  });

  it('findConsultationByPatientIdConsultationId should throw an exception for an invalid patient', async () => {
    const consultation: ConsultationEntity = consultationsList[0]; 
    await expect(()=> service.findConsultationByPatientIdConsultationId("0", consultation.id)).rejects.toHaveProperty("message", "The patient with the given id was not found"); 
  });

  it('findConsultationByPatientIdConsultationId should throw an exception for an consultation not associated to the patient', async () => {
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
      acceptDiagnosis: "no"
    });

    await expect(()=> service.findConsultationByPatientIdConsultationId(patient.id, newConsultation.id)).rejects.toHaveProperty("message", "The consultation with the given id is not associated to the patient"); 
  });

  it('findConsultationsByPatientId should return consultations by patient', async ()=>{
    const consultations: ConsultationEntity[] = await service.findConsultationsByPatientId(patient.id);
    expect(consultations.length).toBe(5)
  });

  it('findConsultationsByPatientId should throw an exception for an invalid patient', async () => {
    await expect(()=> service.findConsultationsByPatientId("0")).rejects.toHaveProperty("message", "The patient with the given id was not found"); 
  });

  // Consultations by patient email

  it('findConsultationByPatientEmailConsultationId should return consultation by patient', async () => {
    const consultation: ConsultationEntity = consultationsList[0];
    const storedConsultation: ConsultationEntity = await service.findConsultationByPatientEmailConsultationId(patient.email, consultation.id, )
    expect(storedConsultation).not.toBeNull();
    expect(storedConsultation.shape).toBe(consultation.shape);
    expect(storedConsultation.numberOfInjuries).toBe(consultation.numberOfInjuries);
    expect(storedConsultation.distribution).toBe(consultation.distribution);
    expect(storedConsultation.comment).toBe(consultation.comment);
    expect(storedConsultation.image).toBe(consultation.image);
    expect(storedConsultation.diagnosis).toBe(consultation.diagnosis);
    expect(storedConsultation.asigned).toBe(consultation.asigned);
    expect(storedConsultation.acceptDiagnosis).toBe(consultation.acceptDiagnosis);
  });

  it('findConsultationByPatientEmailConsultationId should throw an exception for an invalid consultation', async () => {
    await expect(()=> service.findConsultationByPatientEmailConsultationId(patient.email, "0")).rejects.toHaveProperty("message", "The consultation with the given id was not found"); 
  });

  it('findConsultationByPatientEmailConsultationId should throw an exception for an invalid patient', async () => {
    const consultation: ConsultationEntity = consultationsList[0]; 
    await expect(()=> service.findConsultationByPatientEmailConsultationId("0", consultation.id)).rejects.toHaveProperty("message", "The patient with the given id was not found"); 
  });

  it('findConsultationByPatientEmailConsultationId should throw an exception for an consultation not associated to the patient', async () => {
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
      acceptDiagnosis: "no"
    });

    await expect(()=> service.findConsultationByPatientEmailConsultationId(patient.email, newConsultation.id)).rejects.toHaveProperty("message", "The consultation with the given id is not associated to the patient"); 
  });

  it('findConsultationsByPatientEmail should return consultations by patient', async ()=>{
    const consultations: ConsultationEntity[] = await service.findConsultationsByPatientEmail(patient.email);
    expect(consultations.length).toBe(5)
  });

  it('findConsultationsByPatientEmail should throw an exception for an invalid patient', async () => {
    await expect(()=> service.findConsultationsByPatientEmail("0")).rejects.toHaveProperty("message", "The patient with the given id was not found"); 
  });

  ///////////////////

  it('associateConsultationsPatient should update consultations list for a patient', async () => {
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
      acceptDiagnosis: "no"
    });

    const updatedPatient: PatientEntity = await service.associateConsultationsPatient(patient.id, [newConsultation]);
    expect(updatedPatient.consultations.length).toBe(1);

    expect(updatedPatient.consultations[0].shape).toBe(newConsultation.shape);
    expect(updatedPatient.consultations[0].numberOfInjuries).toBe(newConsultation.numberOfInjuries);
    expect(updatedPatient.consultations[0].distribution).toBe(newConsultation.distribution);
    expect(updatedPatient.consultations[0].comment).toBe(newConsultation.comment);
    expect(updatedPatient.consultations[0].image).toBe(newConsultation.image);
    expect(updatedPatient.consultations[0].diagnosis).toBe(newConsultation.diagnosis);
    expect(updatedPatient.consultations[0].asigned).toBe(newConsultation.asigned);
    expect(updatedPatient.consultations[0].acceptDiagnosis).toBe(newConsultation.acceptDiagnosis);
  });

  it('associateConsultationsPatient should throw an exception for an invalid patient', async () => {
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
      acceptDiagnosis: "no"
    });

    await expect(()=> service.associateConsultationsPatient("0", [newConsultation])).rejects.toHaveProperty("message", "The patient with the given id was not found"); 
  });

  it('associateConsultationsPatient should throw an exception for an invalid consultation', async () => {
    const newConsultation: ConsultationEntity = consultationsList[0];
    newConsultation.id = "0";

    await expect(()=> service.associateConsultationsPatient(patient.id, [newConsultation])).rejects.toHaveProperty("message", "The consultation with the given id was not found"); 
  });

  
  it('deleteConsultationToPatient should remove an consultation from a patient', async () => {
    const consultation: ConsultationEntity = consultationsList[0];
    
    await service.deleteConsultationPatient(patient.id, consultation.id);

    const storedPatient: PatientEntity = await patientRepository.findOne({where: {id: patient.id}, relations: ["consultations"]});
    const deletedConsultation: ConsultationEntity = storedPatient.consultations.find(a => a.id === consultation.id);

    expect(deletedConsultation).toBeUndefined();

  });

  it('deleteConsultationToPatient should thrown an exception for an invalid consultation', async () => {
    await expect(()=> service.deleteConsultationPatient(patient.id, "0")).rejects.toHaveProperty("message", "The consultation with the given id was not found"); 
  });

  it('deleteConsultationToPatient should thrown an exception for an invalid patient', async () => {
    const consultation: ConsultationEntity = consultationsList[0];
    await expect(()=> service.deleteConsultationPatient("0", consultation.id)).rejects.toHaveProperty("message", "The patient with the given id was not found"); 
  });

  it('deleteConsultationToPatient should thrown an exception for an non asocciated consultation', async () => {
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
      acceptDiagnosis: "no"
    });

    await expect(()=> service.deleteConsultationPatient(patient.id, newConsultation.id)).rejects.toHaveProperty("message", "The consultation with the given id is not associated to the patient"); 
  }); 

  it('addConsultationPatientByEmail should add an consultation to a patient', async () => {
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
      acceptDiagnosis: "no"
    });

    const newPatient: PatientEntity = await patientRepository.save({
      name: faker.name.fullName(), 
      email: faker.internet.email(),
      password: faker.internet.password(),
      birthDate: faker.date.birthdate().toISOString(), 
      country: faker.address.country(),
      skinType: faker.color.human(),
      profilePicture: faker.image.imageUrl()
    })

    const result: PatientEntity = await service.addConsultationPatientByEmail(newPatient.email, newConsultation.id);
    
    expect(result.consultations.length).toBe(1);
    expect(result.consultations[0]).not.toBeNull();
    expect(result.consultations[0].shape).toBe(newConsultation.shape)
    expect(result.consultations[0].numberOfInjuries).toBe(newConsultation.numberOfInjuries)
    expect(result.consultations[0].distribution).toBe(newConsultation.distribution)
    expect(result.consultations[0].comment).toBe(newConsultation.comment)
    expect(result.consultations[0].image).toBe(newConsultation.image)
    expect(result.consultations[0].diagnosis).toBe(newConsultation.diagnosis)
    expect(result.consultations[0].asigned).toBe(newConsultation.asigned)
    expect(result.consultations[0].acceptDiagnosis).toBe(newConsultation.acceptDiagnosis)
  });

  it('addConsultationPatientByEmail should thrown exception for an invalid consultation', async () => {
    const newPatient: PatientEntity = await patientRepository.save({
      name: faker.name.fullName(), 
      email: faker.internet.email(),
      password: faker.internet.password(),
      birthDate: faker.date.birthdate().toISOString(), 
      country: faker.address.country(),
      skinType: faker.color.human(),
      profilePicture: faker.image.imageUrl()
    })

    await expect(() => service.addConsultationPatientByEmail(newPatient.id, "0")).rejects.toHaveProperty("message", "The consultation with the given id was not found");
  });

  it('addConsultationPatientByEmail should throw an exception for an invalid patient', async () => {
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
      acceptDiagnosis: "no"
    });

    await expect(() => service.addConsultationPatientByEmail("aaa@aaa.com", newConsultation.id)).rejects.toHaveProperty("message", "The patient with the given email was not found");
  });


});