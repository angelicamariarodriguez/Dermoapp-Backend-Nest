import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsultationEntity } from '../consultation/consultation.entity';
import { MedicEntity } from '../medic/medic.entity';
import { MedicConsultationsService } from './medic-consultations.service';
import { MedicConsultationsController } from './medic-consultations.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MedicEntity, ConsultationEntity])],
  providers: [MedicConsultationsService],
  controllers: [MedicConsultationsController]
})
export class MedicConsultationsModule {}
