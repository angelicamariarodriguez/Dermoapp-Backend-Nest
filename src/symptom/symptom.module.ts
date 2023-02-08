import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SymptomEntity } from './symptom.entity';
import { SymptomService } from './symptom.service';

@Module({
  imports: [TypeOrmModule.forFeature([SymptomEntity])],
  providers: [SymptomService]
})
export class SymptomModule {}
