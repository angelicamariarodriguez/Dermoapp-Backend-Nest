import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MedicModule } from './medic/medic.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicEntity } from './medic/medic.entity';
import { PatientModule } from './patient/patient.module';
import { PatientEntity } from './patient/patient.entity';
//import { UserModule } from './user/user.module';
//import { UserEntity } from './user/user.entity';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';


@Module({
  imports: [MedicModule, PatientModule, 
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'dermoapp',
      entities: [MedicEntity, PatientEntity],
      dropSchema: true,
      synchronize: true,
      keepConnectionAlive: true
    }), AuthModule, UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
 })
 export class AppModule {}