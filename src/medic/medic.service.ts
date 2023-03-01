import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { MedicEntity } from './medic.entity';

@Injectable()
export class MedicService {
    constructor(
        @InjectRepository(MedicEntity)
        private readonly medicRepository: Repository<MedicEntity>
    ){}

    async findAll(): Promise<MedicEntity[]> {
        return await this.medicRepository.find();
    }

    async findOne(id: string): Promise<MedicEntity> {
        const medic: MedicEntity = await this.medicRepository.findOne({where: {id}, relations: ["consultations"]} );
        if (!medic)
          throw new BusinessLogicException("The medic with the given id was not found", BusinessError.NOT_FOUND);
    
        return medic;
    }
    
    async create(medic: MedicEntity): Promise<MedicEntity> {
        return await this.medicRepository.save(medic);
    }

    async update(id: string, medic: MedicEntity): Promise<MedicEntity> {
        const persistedMedic: MedicEntity = await this.medicRepository.findOne({where:{id}});
        if (!persistedMedic)
          throw new BusinessLogicException("The medic with the given id was not found", BusinessError.NOT_FOUND);
        
        return await this.medicRepository.save({...persistedMedic, ...medic});
    }

    async delete(id: string) {
        const medic: MedicEntity = await this.medicRepository.findOne({where:{id}});
        if (!medic)
          throw new BusinessLogicException("The medic with the given id was not found", BusinessError.NOT_FOUND);
      
        await this.medicRepository.remove(medic);
    }

    async findOneByEmail(email: string): Promise<MedicEntity> {
        const medic: MedicEntity = await this.medicRepository.findOne({where: {email}} );
        if (!medic)
          throw new BusinessLogicException("The medic with the given email was not found", BusinessError.NOT_FOUND);
    
        return medic;
       }
}
