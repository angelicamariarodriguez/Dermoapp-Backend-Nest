import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { PatientDto } from './patient.dto';
import { PatientEntity } from './patient.entity';
import { PatientService } from './patient.service';

@Controller('patients')
@UseInterceptors(BusinessErrorsInterceptor)
export class PatientController {
    constructor(private readonly patientService: PatientService) {}

  @Get()
  async findAll() {
    return await this.patientService.findAll();
  }

  @Get(':patientId')
  async findOne(@Param('patientId') patientId: string) {
    return await this.patientService.findOne(patientId);
  }

  @Post()
  async create(@Body() patientDto: PatientDto) {
    const patient: PatientEntity = plainToInstance(PatientEntity, patientDto);
    return await this.patientService.create(patient);
  }

  @Put(':patientId')
  async update(@Param('patientId') patientId: string, @Body() patientDto: PatientDto) {
    const patient: PatientEntity = plainToInstance(PatientEntity, patientDto);
    return await this.patientService.update(patientId, patient);
  }

  @Delete(':patientId')
  @HttpCode(204)
  async delete(@Param('patientId') patientId: string) {
    return await this.patientService.delete(patientId);
  }
}