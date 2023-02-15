import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { ConsultationEntity } from './consultation.entity';

@Injectable()
export class ConsultationService {
    constructor(
        @InjectRepository(ConsultationEntity)
        private readonly consultationRepository: Repository<ConsultationEntity>
    ){}

    async findAll(): Promise<ConsultationEntity[]> {
        return await this.consultationRepository.find();
    }

    async findOne(id: string): Promise<ConsultationEntity> {
        const consultation: ConsultationEntity = await this.consultationRepository.findOne({where: {id}} );
        if (!consultation)
          throw new BusinessLogicException("The consultation with the given id was not found", BusinessError.NOT_FOUND);
    
        return consultation;
    }
    
    async create(consultation: ConsultationEntity): Promise<ConsultationEntity> {
        return await this.consultationRepository.save(consultation);
    }

    async update(id: string, consultation: ConsultationEntity): Promise<ConsultationEntity> {
        const persistedConsultation: ConsultationEntity = await this.consultationRepository.findOne({where:{id}});
        if (!persistedConsultation)
          throw new BusinessLogicException("The consultation with the given id was not found", BusinessError.NOT_FOUND);
        
        return await this.consultationRepository.save({...persistedConsultation, ...consultation});
    }

    async delete(id: string) {
        const consultation: ConsultationEntity = await this.consultationRepository.findOne({where:{id}});
        if (!consultation)
          throw new BusinessLogicException("The consultation with the given id was not found", BusinessError.NOT_FOUND);
      
        await this.consultationRepository.remove(consultation);
    }
}