import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConsultationEntity } from '../consultation/consultation.entity';
import { Repository } from 'typeorm';
import { SymptomEntity } from '../symptom/symptom.entity';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class SymptomConsultationService {
    constructor(
        @InjectRepository(SymptomEntity)
        private readonly symptomRepository: Repository<SymptomEntity>,
    
        @InjectRepository(ConsultationEntity)
        private readonly consultationRepository: Repository<ConsultationEntity>
    ) {}

    async addConsultationSymptom(symptomId: string, consultationId: string): Promise<SymptomEntity> {
        const consultation: ConsultationEntity = await this.consultationRepository.findOne({where: {id: consultationId}});
        if (!consultation)
          throw new BusinessLogicException("The consultation with the given id was not found", BusinessError.NOT_FOUND);
       
        const symptom: SymptomEntity = await this.symptomRepository.findOne({where: {id: symptomId}, relations: ["consultations"]}) 
        if (!symptom)
          throw new BusinessLogicException("The symptom with the given id was not found", BusinessError.NOT_FOUND);
     
        symptom.consultations = [...symptom.consultations, consultation];
        return await this.symptomRepository.save(symptom);
      }

    async findConsultationsBySpecialty(specialty: string): Promise<ConsultationEntity[]> {
        const symptoms: SymptomEntity[] = await this.symptomRepository.find({where: {specialty}, relations: ["consultations"] } );
        console.log(symptoms.length)
        if (!symptoms)
          throw new BusinessLogicException("The symptoms with the given specialty was not found", BusinessError.NOT_FOUND)
        
        let consultations: ConsultationEntity[] =[];

        for(let i = 0; i < symptoms.length; i++){
            console.log("el sinotma"+i)
            for(let j = 0; j < symptoms[i].consultations.length; j++){
                console.log("sintoma"+i)
                console.log("consulta"+j)
                consultations.push(symptoms[i].consultations[j])
            }      
        }
        
        return consultations
        
    }

}
