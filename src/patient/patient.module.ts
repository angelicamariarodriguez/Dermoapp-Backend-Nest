import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientEntity } from './patient.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PatientEntity])],
  providers: [PatientService]
})
export class PatientModule {}
