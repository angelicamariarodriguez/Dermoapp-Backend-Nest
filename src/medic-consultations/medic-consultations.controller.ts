import { Controller, Get, Param, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { MedicConsultationsService } from './medic-consultations.service';

@Controller('medics')
@UseInterceptors(BusinessErrorsInterceptor)
export class MedicConsultationsController {
    constructor(private readonly medicConsultationService: MedicConsultationsService){}

    @UseGuards(JwtAuthGuard)
    @Post(':medicId/consultations/:consultationId')
   async addConsultationToMedic(@Param('medicId') medicId: string, @Param('consultationId') consultationId: string){
       return await this.medicConsultationService.addConsultationToMedic(medicId, consultationId);
   }

   @UseGuards(JwtAuthGuard)
   @Get(':medicId/consultations')
   async findConsultationsByMedicId(@Param('medicId') medicId: string){
       return await this.medicConsultationService.findConsultationsByMedicId(medicId);
   }
}
