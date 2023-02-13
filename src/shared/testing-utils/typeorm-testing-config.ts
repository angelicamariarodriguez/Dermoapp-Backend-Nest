import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientEntity } from '../../patient/patient.entity';
import { MedicEntity } from '../../medic/medic.entity';
import { UserEntity } from '../../user/user.entity';
import { ConsultationEntity } from '../../consultation/consultation.entity';
import { SymptomEntity } from '../../symptom/symptom.entity';

export const TypeOrmTestingConfig = () => [
 TypeOrmModule.forRoot({
   type: 'sqlite',
   database: ':memory:',
   dropSchema: true,
   entities: [PatientEntity, MedicEntity, UserEntity, ConsultationEntity, SymptomEntity],
   synchronize: true,
   keepConnectionAlive: true
 }),
 TypeOrmModule.forFeature([PatientEntity, MedicEntity, UserEntity, ConsultationEntity, SymptomEntity]),
];