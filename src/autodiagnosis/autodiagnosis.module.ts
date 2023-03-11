import { Module } from '@nestjs/common';
import { AutodiagnosisService } from './autodiagnosis.service';
import { AutodiagnosisController } from './autodiagnosis.controller';
import { ConsultationService } from '../consultation/consultation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsultationEntity } from '../consultation/consultation.entity';

@Module({
  providers: [AutodiagnosisService, ConsultationService],
  imports: [TypeOrmModule.forFeature([ConsultationEntity])],
  controllers: [AutodiagnosisController]
})
export class AutodiagnosisModule {}
