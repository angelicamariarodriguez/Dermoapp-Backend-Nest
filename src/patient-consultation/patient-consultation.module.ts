import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsultationEntity } from '../consultation/consultation.entity';
import { PatientEntity } from '../patient/patient.entity';
import { PatientConsultationService } from './patient-consultation.service';
import { PatientConsultationController } from './patient-consultation.controller';

@Module({
  providers: [PatientConsultationService],
  imports: [TypeOrmModule.forFeature([PatientEntity, ConsultationEntity])],
  controllers: [PatientConsultationController],
})
export class PatientConsultationModule {}
