import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicEntity } from './medic.entity';
import { MedicService } from './medic.service';

@Module({
  imports: [TypeOrmModule.forFeature([MedicEntity])],
  providers: [MedicService]
})
export class MedicModule {}
