import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicEntity } from '../../medic/medic.entity';

export const TypeOrmTestingConfig = () => [
 TypeOrmModule.forRoot({
   type: 'sqlite',
   database: ':memory:',
   dropSchema: true,
   entities: [MedicEntity],
   synchronize: true,
   keepConnectionAlive: true
 }),
 TypeOrmModule.forFeature([MedicEntity]),
];