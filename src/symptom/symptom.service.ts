import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SymptomEntity } from './symptom.entity';

@Injectable()
export class SymptomService {
    constructor(
        @InjectRepository(SymptomEntity)
        private readonly symptomRepository: Repository<SymptomEntity>
    ){}

    async create(symptom: SymptomEntity): Promise<SymptomEntity> {
        return await this.symptomRepository.save(symptom);
    }
}
