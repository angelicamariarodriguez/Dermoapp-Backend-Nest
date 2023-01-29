import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PatientModule } from './patient/patient.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientEntity } from './patient/patient.entity';
import { UserModule } from './user/user.module';

@Module({
  imports: [PatientModule, 
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'dermoapp',
      entities: [PatientEntity],
      dropSchema: true,
      synchronize: true,
      keepConnectionAlive: true
    }), UserModule,
   
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
