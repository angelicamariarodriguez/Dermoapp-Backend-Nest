import { Module } from '@nestjs/common';
import { AutodiagnosisService } from './autodiagnosis.service';
import { AutodiagnosisController } from './autodiagnosis.controller';

@Module({
  providers: [AutodiagnosisService],
  controllers: [AutodiagnosisController]
})
export class AutodiagnosisModule {}
