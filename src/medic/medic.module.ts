import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicEntity } from './medic.entity';
import { MedicService } from './medic.service';
import { MedicController } from './medic.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MedicEntity])],
  providers: [MedicService],
  controllers: [MedicController]
})
export class MedicModule {}
