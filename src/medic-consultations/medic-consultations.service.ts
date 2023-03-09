import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConsultationEntity } from '../consultation/consultation.entity';
import { Repository } from 'typeorm';
import { MedicEntity } from '../medic/medic.entity';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { PatientEntity } from 'src/patient/patient.entity';

@Injectable()
export class MedicConsultationsService {
    constructor(
        @InjectRepository(MedicEntity)
        private readonly medicRepository: Repository<MedicEntity>,
    
        @InjectRepository(ConsultationEntity)
        private readonly consultationRepository: Repository<ConsultationEntity>
    ) {}

    async addConsultationToMedic(medicId: string, consultationId: string): Promise<MedicEntity> {
        const consultation: ConsultationEntity = await this.consultationRepository.findOne({where: {id: consultationId}});
        if (!consultation)
          throw new BusinessLogicException("The consultation with the given id was not found", BusinessError.NOT_FOUND);
      
        const medic: MedicEntity = await this.medicRepository.findOne({where: {id: medicId}, relations: ["consultations"]})
        if (!medic)
          throw new BusinessLogicException("The medic with the given id was not found", BusinessError.NOT_FOUND);    
        medic.consultations = [...medic.consultations, consultation];

        consultation.asigned = true
        this.consultationRepository.save({...consultation, ...consultation});
        return await this.medicRepository.save(medic);
      }

    async findConsultationsByMedicId(medicId: string): Promise<ConsultationEntity[]> {
      const medic: MedicEntity = await this.medicRepository.findOne({where: {id: medicId}, relations: ["consultations"]});
      if (!medic)
        throw new BusinessLogicException("The medic with the given id was not found", BusinessError.NOT_FOUND)
      
      const consultations: ConsultationEntity[] = medic.consultations;
      const consultations2: ConsultationEntity[] = [];

      for(let i=0;i<consultations.length;i++){
        const consultation = this.consultationRepository.findOne({where: {id: consultations[i].id}, relations: ["patient"]})
        consultations2[i] = (await consultation)
      }
      return consultations2;
  }
}
