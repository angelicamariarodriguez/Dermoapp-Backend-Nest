import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsultationEntity } from './consultation.entity';
import { ConsultationService } from './consultation.service';
import { ConsultationController } from './consultation.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ConsultationEntity])],
  providers: [ConsultationService],
  controllers: [ConsultationController]
})
export class ConsultationModule {}
