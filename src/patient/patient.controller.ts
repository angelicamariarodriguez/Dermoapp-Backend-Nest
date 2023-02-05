import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { PatientDto } from './patient.dto';
import { PatientEntity } from './patient.entity';
import { PatientService } from './patient.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('patients')
@UseInterceptors(BusinessErrorsInterceptor)
export class PatientController {
    constructor(private readonly patientService: PatientService) {}

  //@UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return await this.patientService.findAll();
  }

  //@UseGuards(JwtAuthGuard)
  @Get(':patientId')
  async findOne(@Param('patientId') patientId: string) {
    return await this.patientService.findOne(patientId);
  }

  
  @Post()
  async create(@Body() patientDto: PatientDto) {
    const patient: PatientEntity = plainToInstance(PatientEntity, patientDto);
    return await this.patientService.create(patient);
  }

  //@UseGuards(JwtAuthGuard)
  @Put(':patientId')
  async update(@Param('patientId') patientId: string, @Body() patientDto: PatientDto) {
    const patient: PatientEntity = plainToInstance(PatientEntity, patientDto);
    return await this.patientService.update(patientId, patient);
  }

  //@UseGuards(JwtAuthGuard)
  @Delete(':patientId')
  @HttpCode(204)
  async delete(@Param('patientId') patientId: string) {
    return await this.patientService.delete(patientId);
  }
}