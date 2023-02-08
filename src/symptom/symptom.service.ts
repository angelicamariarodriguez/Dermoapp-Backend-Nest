import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { SymptomEntity } from './symptom.entity';

@Injectable()
export class SymptomService {
    constructor(
        @InjectRepository(SymptomEntity)
        private readonly symptomRepository: Repository<SymptomEntity>
    ){}

    async findAll(): Promise<SymptomEntity[]> {
        return await this.symptomRepository.find();
    }

    async findOne(id: string): Promise<SymptomEntity> {
        const symptom: SymptomEntity = await this.symptomRepository.findOne({where: {id}} );
        if (!symptom)
          throw new BusinessLogicException("The symptom with the given id was not found", BusinessError.NOT_FOUND);
    
        return symptom;
    }

    async create(symptom: SymptomEntity): Promise<SymptomEntity> {
        return await this.symptomRepository.save(symptom);
    }

    async update(id: string, symptom: SymptomEntity): Promise<SymptomEntity> {
        const persistedSymptom: SymptomEntity = await this.symptomRepository.findOne({where:{id}});
        if (!persistedSymptom)
          throw new BusinessLogicException("The symptom with the given id was not found", BusinessError.NOT_FOUND);
        
        return await this.symptomRepository.save({...persistedSymptom, ...symptom});
    }

    async delete(id: string) {
        const symptom: SymptomEntity = await this.symptomRepository.findOne({where:{id}});
        if (!symptom)
          throw new BusinessLogicException("The symptom with the given id was not found", BusinessError.NOT_FOUND);
      
        await this.symptomRepository.remove(symptom);
    }
}
