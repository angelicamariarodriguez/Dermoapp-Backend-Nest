import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SymptomEntity } from './symptom.entity';
import { SymptomService } from './symptom.service';
import { SymptomController } from './symptom.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SymptomEntity])],
  providers: [SymptomService],
  controllers: [SymptomController]
})
export class SymptomModule {}
