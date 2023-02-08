import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsultationEntity } from './consultation.entity';
import { ConsultationService } from './consultation.service';

@Module({
  imports: [TypeOrmModule.forFeature([ConsultationEntity])],
  providers: [ConsultationService]
})
export class ConsultationModule {}
