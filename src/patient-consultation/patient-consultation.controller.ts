/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { PatientConsultationService } from './patient-consultation.service';
import { ConsultationDto } from '../consultation/consultation.dto';
import { ConsultationEntity } from '../consultation/consultation.entity';
import { plainToInstance } from 'class-transformer';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('patients')
@UseInterceptors(BusinessErrorsInterceptor)
export class PatientConsultationController {
   constructor(private readonly patientConsultationService: PatientConsultationService){}

   @UseGuards(JwtAuthGuard)
   @Post(':patientEmail/consultations/:consultationId')
   async addConsultationPatientByEmail(@Param('patientEmail') patientEmail: string, @Param('consultationId') consultationId: string){
       return await this.patientConsultationService.addConsultationPatientByEmail(patientEmail, consultationId);
   }
   
 /*  @UseGuards(JwtAuthGuard)
   @Get(':patientId/consultations/:consultationId')
   async findConsultationByPatientIdConsultationId(@Param('patientId') patientId: string, @Param('consultationId') consultationId: string){
       return await this.patientConsultationService.findConsultationByPatientIdConsultationId(patientId, consultationId);
   }

   @UseGuards(JwtAuthGuard)
   @Get(':patientId/consultations')
   async findConsultationsByPatientId(@Param('patientId') patientId: string){
       return await this.patientConsultationService.findConsultationsByPatientId(patientId);
   }
*/

   @UseGuards(JwtAuthGuard)
   @Get(':patientEmail/consultations/:consultationId')
   async findConsultationByPatientemailConsultationId(@Param('patientEmail') patientEmail: string, @Param('consultationId') consultationId: string){
       return await this.patientConsultationService.findConsultationByPatientEmailConsultationId(patientEmail, consultationId);
   }

   @UseGuards(JwtAuthGuard)
   @Get(':patientEmail/consultations')
   async findConsultationsByPatientEmail(@Param('patientEmail') patientEmail: string){
       return await this.patientConsultationService.findConsultationsByPatientEmail(patientEmail);
   }


   @UseGuards(JwtAuthGuard)
   @Put(':patientId/consultations')
   async associateConsultationsPatient(@Body() consultationsDto: ConsultationDto[], @Param('patientId') patientId: string){
       const consultations = plainToInstance(ConsultationEntity, consultationsDto)
       return await this.patientConsultationService.associateConsultationsPatient(patientId, consultations);
   }

   @UseGuards(JwtAuthGuard)
   @Delete(':patientId/consultations/:consultationId')
   @HttpCode(204)
   async deleteConsultationPatient(@Param('patientId') patientId: string, @Param('consultationId') consultationId: string){
       return await this.patientConsultationService.deleteConsultationPatient(patientId, consultationId);
   }
}