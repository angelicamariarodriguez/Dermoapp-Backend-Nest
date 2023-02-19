/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { PatientConsultationService } from './patient-consultation.service';
import { ConsultationDto } from '../consultation/consultation.dto';
import { ConsultationEntity } from '../consultation/consultation.entity';
import { plainToInstance } from 'class-transformer';

@Controller('patients')
@UseInterceptors(BusinessErrorsInterceptor)
export class PatientConsultationController {
   constructor(private readonly patientConsultationService: PatientConsultationService){}

   /*@Post(':patientId/consultations/:consultationId')
   async addConsultationPatient(@Param('patientId') patientId: string, @Param('consultationId') consultationId: string){
       return await this.patientConsultationService.addConsultationPatient(patientId, consultationId);
   }*/

   @Post(':patientEmail/consultations/:consultationId')
   async addConsultationPatientByEmail(@Param('patientEmail') patientEmail: string, @Param('consultationId') consultationId: string){
       return await this.patientConsultationService.addConsultationPatientByEmail(patientEmail, consultationId);
   }

   @Get(':patientId/consultations/:consultationId')
   async findConsultationByPatientIdConsultationId(@Param('patientId') patientId: string, @Param('consultationId') consultationId: string){
       return await this.patientConsultationService.findConsultationByPatientIdConsultationId(patientId, consultationId);
   }

   @Get(':patientId/consultations')
   async findConsultationsByPatientId(@Param('patientId') patientId: string){
       return await this.patientConsultationService.findConsultationsByPatientId(patientId);
   }

   @Put(':patientId/consultations')
   async associateConsultationsPatient(@Body() consultationsDto: ConsultationDto[], @Param('patientId') patientId: string){
       const consultations = plainToInstance(ConsultationEntity, consultationsDto)
       return await this.patientConsultationService.associateConsultationsPatient(patientId, consultations);
   }

   @Delete(':patientId/consultations/:consultationId')
   @HttpCode(204)
   async deleteConsultationPatient(@Param('patientId') patientId: string, @Param('consultationId') consultationId: string){
       return await this.patientConsultationService.deleteConsultationPatient(patientId, consultationId);
   }
}