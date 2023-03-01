import { Controller, Get, Param, Post, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { MedicConsultationsService } from './medic-consultations.service';

@Controller('medics')
@UseInterceptors(BusinessErrorsInterceptor)
export class MedicConsultationsController {
    constructor(private readonly medicConsultationService: MedicConsultationsService){}

    @Post(':medicId/consultations/:consultationId')
   async addConsultationToMedic(@Param('medicId') medicId: string, @Param('consultationId') consultationId: string){
       return await this.medicConsultationService.addConsultationToMedic(medicId, consultationId);
   }

   @Get(':medicId/consultations')
   async findConsultationsByMedicId(@Param('medicId') medicId: string){
       return await this.medicConsultationService.findConsultationsByMedicId(medicId);
   }
}
