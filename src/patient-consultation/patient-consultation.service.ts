/* archivo: src/patient-consultation/patient-consultation.service.ts */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConsultationEntity } from '../consultation/consultation.entity';
import { PatientEntity } from '../patient/patient.entity';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class PatientConsultationService {
   constructor(
       @InjectRepository(PatientEntity)
       private readonly patientRepository: Repository<PatientEntity>,
   
       @InjectRepository(ConsultationEntity)
       private readonly consultationRepository: Repository<ConsultationEntity>
   ) {}

   async addConsultationPatient(patientId: string, consultationId: string): Promise<PatientEntity> {
       const consultation: ConsultationEntity = await this.consultationRepository.findOne({where: {id: consultationId}});
       if (!consultation)
         throw new BusinessLogicException("The consultation with the given id was not found", BusinessError.NOT_FOUND);
     
       const patient: PatientEntity = await this.patientRepository.findOne({where: {id: patientId}, relations: ["consultations"]})
       if (!patient)
         throw new BusinessLogicException("The patient with the given id was not found", BusinessError.NOT_FOUND);
   
       patient.consultations = [...patient.consultations, consultation];
       return await this.patientRepository.save(patient);
     }
     
    async addConsultationPatientByEmail(patientEmail: string, consultationId: string): Promise<PatientEntity> {
      const consultation: ConsultationEntity = await this.consultationRepository.findOne({where: {id: consultationId}});
      if (!consultation)
        throw new BusinessLogicException("The consultation with the given id was not found", BusinessError.NOT_FOUND);
    
      const patient: PatientEntity = await this.patientRepository.findOne({where: {email: patientEmail}, relations: ["consultations"]})
      if (!patient)
        throw new BusinessLogicException("The patient with the given email was not found", BusinessError.NOT_FOUND);
  
      patient.consultations = [...patient.consultations, consultation];
      return await this.patientRepository.save(patient);
    }
   
   async findConsultationByPatientIdConsultationId(patientId: string, consultationId: string): Promise<ConsultationEntity> {
       const consultation: ConsultationEntity = await this.consultationRepository.findOne({where: {id: consultationId}});
       if (!consultation)
         throw new BusinessLogicException("The consultation with the given id was not found", BusinessError.NOT_FOUND)
      
       const patient: PatientEntity = await this.patientRepository.findOne({where: {id: patientId}, relations: ["consultations"]});
       if (!patient)
         throw new BusinessLogicException("The patient with the given id was not found", BusinessError.NOT_FOUND)
  
       const patientConsultation: ConsultationEntity = patient.consultations.find(e => e.id === consultation.id);
  
       if (!patientConsultation)
         throw new BusinessLogicException("The consultation with the given id is not associated to the patient", BusinessError.PRECONDITION_FAILED)
  
       return patientConsultation;
   }
   
   async findConsultationsByPatientId(patientId: string): Promise<ConsultationEntity[]> {
       const patient: PatientEntity = await this.patientRepository.findOne({where: {id: patientId}, relations: ["consultations"]});
       if (!patient)
         throw new BusinessLogicException("The patient with the given id was not found", BusinessError.NOT_FOUND)
      
       return patient.consultations;
   }
   
   async associateConsultationsPatient(patientId: string, consultations: ConsultationEntity[]): Promise<PatientEntity> {
       const patient: PatientEntity = await this.patientRepository.findOne({where: {id: patientId}, relations: ["consultations"]});
   
       if (!patient)
         throw new BusinessLogicException("The patient with the given id was not found", BusinessError.NOT_FOUND)
   
       for (let i = 0; i < consultations.length; i++) {
         const consultation: ConsultationEntity = await this.consultationRepository.findOne({where: {id: consultations[i].id}});
         if (!consultation)
           throw new BusinessLogicException("The consultation with the given id was not found", BusinessError.NOT_FOUND)
       }
   
       patient.consultations = consultations;
       return await this.patientRepository.save(patient);
     }
   
   async deleteConsultationPatient(patientId: string, consultationId: string){
       const consultation: ConsultationEntity = await this.consultationRepository.findOne({where: {id: consultationId}});
       if (!consultation)
         throw new BusinessLogicException("The consultation with the given id was not found", BusinessError.NOT_FOUND)
   
       const patient: PatientEntity = await this.patientRepository.findOne({where: {id: patientId}, relations: ["consultations"]});
       if (!patient)
         throw new BusinessLogicException("The patient with the given id was not found", BusinessError.NOT_FOUND)
   
       const patientConsultation: ConsultationEntity = patient.consultations.find(e => e.id === consultation.id);
   
       if (!patientConsultation)
           throw new BusinessLogicException("The consultation with the given id is not associated to the patient", BusinessError.PRECONDITION_FAILED)

       patient.consultations = patient.consultations.filter(e => e.id !== consultationId);
       await this.patientRepository.save(patient);
   }  

   async findConsultationByPatientEmailConsultationId(patientEmail: string, consultationId: string): Promise<ConsultationEntity> {
    const consultation: ConsultationEntity = await this.consultationRepository.findOne({where: {id: consultationId}});
    if (!consultation)
      throw new BusinessLogicException("The consultation with the given id was not found", BusinessError.NOT_FOUND)
   
    const patient: PatientEntity = await this.patientRepository.findOne({where: {email: patientEmail}, relations: ["consultations"]});
    if (!patient)
      throw new BusinessLogicException("The patient with the given id was not found", BusinessError.NOT_FOUND)

    const patientConsultation: ConsultationEntity = patient.consultations.find(e => e.id === consultation.id);

    if (!patientConsultation)
      throw new BusinessLogicException("The consultation with the given id is not associated to the patient", BusinessError.PRECONDITION_FAILED)

    return patientConsultation;
  }   
  async findConsultationsByPatientEmail(patientEmail: string): Promise<ConsultationEntity[]> {
    const patient: PatientEntity = await this.patientRepository.findOne({where: {email: patientEmail}, relations: ["consultations"]});
    if (!patient)
      throw new BusinessLogicException("The patient with the given id was not found", BusinessError.NOT_FOUND)
   
    return patient.consultations;
  }



}
