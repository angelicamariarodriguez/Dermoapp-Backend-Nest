import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { ConsultationDto } from './consultation.dto';
import { ConsultationEntity } from './consultation.entity';
import { ConsultationService } from './consultation.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('consultations')
@UseInterceptors(BusinessErrorsInterceptor)
export class ConsultationController {
    constructor(private readonly consultationService: ConsultationService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return await this.consultationService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':consultationId')
  async findOne(@Param('consultationId') consultationId: string) {
    return await this.consultationService.findOne(consultationId);
  }

  //@UseGuards(JwtAuthGuard)
  @Get('specialty/:specialty')
  async findAllBySpecialty(@Param('specialty') specialty: string) {
    return await this.consultationService.findAllBySpecialty(specialty);
  }

  
  @Post()
  async create(@Body() consultationDto: ConsultationDto) {
    const consultation: ConsultationEntity = plainToInstance(ConsultationEntity, consultationDto);
    return await this.consultationService.create(consultation);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':consultationId')
  async update(@Param('consultationId') consultationId: string, @Body() consultationDto: ConsultationDto) {
    const consultation: ConsultationEntity = plainToInstance(ConsultationEntity, consultationDto);
    return await this.consultationService.update(consultationId, consultation);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':consultationId')
  @HttpCode(204)
  async delete(@Param('consultationId') consultationId: string) {
    return await this.consultationService.delete(consultationId);
  }

}