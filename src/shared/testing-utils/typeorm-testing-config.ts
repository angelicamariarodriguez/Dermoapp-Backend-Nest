import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientEntity } from '../../patient/patient.entity';
export const TypeOrmTestingConfig = () => [
 TypeOrmModule.forRoot({
   type: 'sqlite',
   database: ':memory:',
   dropSchema: true,
   entities: [PatientEntity],
   synchronize: true,
   keepConnectionAlive: true
 }),
 TypeOrmModule.forFeature([PatientEntity]),
];