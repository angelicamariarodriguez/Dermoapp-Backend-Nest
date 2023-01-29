import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PatientEntity } from './patient.entity';
import { BusinessLogicException } from '../shared/errors/business-errors';
import { BusinessError } from '../shared/errors/business-errors';

@Injectable()
export class PatientService {

    constructor(
        @InjectRepository(PatientEntity)
        private readonly patientRepository: Repository<PatientEntity>,
    ){}

    async findAll(): Promise<PatientEntity[]> {
        return await this.patientRepository.find();
    }
 
    async findOne(id: string): Promise<PatientEntity> {
        const patient: PatientEntity = await this.patientRepository.findOne({where: {id}} );
        if (!patient)
          throw new BusinessLogicException("The patient with the given id was not found", BusinessError.NOT_FOUND);
   
        return patient;
    }
   
    async create(patient: PatientEntity): Promise<PatientEntity> {
        return await this.patientRepository.save(patient);
    }
 
    async update(id: string, patient: PatientEntity): Promise<PatientEntity> {
        const persistedPatient: PatientEntity = await this.patientRepository.findOne({where:{id}});
        if (!persistedPatient)
          throw new BusinessLogicException("The patient with the given id was not found", BusinessError.NOT_FOUND);
       
        patient.id = id; 
       
        return await this.patientRepository.save(patient);
    }
 
    async delete(id: string) {
        const patient: PatientEntity = await this.patientRepository.findOne({where:{id}});
        if (!patient)
          throw new BusinessLogicException("The patient with the given id was not found", BusinessError.NOT_FOUND);
     
        await this.patientRepository.remove(patient);
    }
}
