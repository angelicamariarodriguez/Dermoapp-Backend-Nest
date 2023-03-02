import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards, UseInterceptors  } from '@nestjs/common';
import { AutodiagnosisService } from './autodiagnosis.service';
import { CreateAutodiagnosisDto } from './create-autodiagnosis.dto';

@Controller('autodiagnosis')
export class AutodiagnosisController {
    constructor(private readonly autodiagnosisService: AutodiagnosisService) {}

    @Post()
    async createCompletion(@Body() createAutodiagnosisDto: CreateAutodiagnosisDto) {
      return this.autodiagnosisService.createCompletion(createAutodiagnosisDto);
    }    
}
