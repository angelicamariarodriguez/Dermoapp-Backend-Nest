import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsultationEntity } from 'src/consultation/consultation.entity';
import { SymptomEntity } from 'src/symptom/symptom.entity';
import { SymptomConsultationService } from './symptom-consultation.service';
import { SymptomConsultationController } from './symptom-consultation.controller';

@Module({
  providers: [SymptomConsultationService],
  imports: [TypeOrmModule.forFeature([SymptomEntity, ConsultationEntity])],
  controllers: [SymptomConsultationController],
})
export class SymptomConsultationModule {}
