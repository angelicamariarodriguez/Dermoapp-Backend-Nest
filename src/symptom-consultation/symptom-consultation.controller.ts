import { Controller, Get, Param, Post, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { SymptomConsultationService } from './symptom-consultation.service';

@Controller('symptoms')
@UseInterceptors(BusinessErrorsInterceptor)
export class SymptomConsultationController {
    constructor(private readonly symptomConsultationService: SymptomConsultationService){}

    @Post(':symptomId/consultations/:consultationId')
    async addConsultationSymptom(@Param('symptomId') symptomId: string, @Param('consultationId') consultationId: string){
        return await this.symptomConsultationService.addConsultationSymptom(symptomId, consultationId);
    }

    @Get('specialty/:specialty')
    async findConsultationsBySpecialty(@Param('specialty') specialty: string){
        return await this.symptomConsultationService.findConsultationsBySpecialty(specialty);
    }
}
