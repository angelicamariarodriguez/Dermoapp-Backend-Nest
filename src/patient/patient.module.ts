import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientEntity } from './patient.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientController } from './patient.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PatientEntity])],
  providers: [PatientService],
  controllers: [PatientController]
})
export class PatientModule {}
