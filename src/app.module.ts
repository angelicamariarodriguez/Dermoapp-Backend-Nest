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
import { SymptomModule } from './symptom/symptom.module';
import { ConsultationEntity } from './consultation/consultation.entity';
import { SymptomEntity } from './symptom/symptom.entity';

@Module({
  imports: [MedicModule, PatientModule, UserModule, ConsultationModule, SymptomModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '10.77.144.3',
      port: 5432,
      username: 'postgres',
      password: 'dermoapp23#',
      database: 'dermoapp',
      entities: [MedicEntity, PatientEntity, UserEntity, ConsultationEntity, SymptomEntity],
      //dropSchema: true,
      synchronize: true,
      keepConnectionAlive: true
    }), UserModule, AuthModule, ConsultationModule, SymptomModule,
  ],
  controllers: [AppController],
  providers: [AppService],
 })
 export class AppModule {}