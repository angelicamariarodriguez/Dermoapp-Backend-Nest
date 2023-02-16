import { Body, Controller, Get, Param, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { SymptomDto } from './symptom.dto';
import { SymptomEntity } from './symptom.entity';
import { SymptomService } from './symptom.service';

@Controller('symptoms')
@UseInterceptors(BusinessErrorsInterceptor)
export class SymptomController {
    constructor(private readonly syptomService: SymptomService) {}

    //@UseGuards(JwtAuthGuard)
    /*@Get('specialty/:specialty')
    async findAllBySpecialty(@Param('specialty') specialty: string) {
      return await this.syptomService.findAllBySpecialty(specialty);
    }*/

    @Post()
    async create(@Body() symptomDto: SymptomDto) {
    const symptom: SymptomEntity = plainToInstance(SymptomEntity, symptomDto);
    return await this.syptomService.create(symptom);
    }

    @Get()
    async findAll() {
      return await this.syptomService.findAll();
    }
}
