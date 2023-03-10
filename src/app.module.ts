import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MedicModule } from './medic/medic.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicEntity } from './medic/medic.entity';
import { PatientModule } from './patient/patient.module';
import { PatientEntity } from './patient/patient.entity';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { UserEntity } from './user/user.entity';
import { ConsultationModule } from './consultation/consultation.module';
import { ConsultationEntity } from './consultation/consultation.entity';
import { PatientConsultationModule } from './patient-consultation/patient-consultation.module';
import { MedicConsultationsModule } from './medic-consultations/medic-consultations.module';
import { AutodiagnosisModule } from './autodiagnosis/autodiagnosis.module';

@Module({
  imports: [MedicModule, PatientModule, UserModule, 
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '10.77.144.3', // Production DB host is: '10.77.144.3'
      port: 5432,
      username: 'postgres',
      password: 'dermoapp23#', // Production DB password is 'dermoapp23#'
      database: 'dermoapp',
      entities: [MedicEntity, PatientEntity, UserEntity, ConsultationEntity],
      //dropSchema: true, // Need to comment for production
      synchronize: true,
      keepConnectionAlive: true
    }), UserModule, AuthModule, ConsultationModule, PatientConsultationModule, MedicConsultationsModule, AutodiagnosisModule
  ],
  controllers: [AppController],
  providers: [AppService],
 })
 export class AppModule {}