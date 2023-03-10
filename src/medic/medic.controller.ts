import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { MedicDto } from './medic.dto';
import { MedicEntity } from './medic.entity';
import { MedicService } from './medic.service';

@Controller('medics')
@UseInterceptors(BusinessErrorsInterceptor)
export class MedicController {
    constructor(private readonly medicService: MedicService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll() {
    return await this.medicService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':medicId')
    async findOne(@Param('medicId') medicId: string) {
    return await this.medicService.findOne(medicId);
    }

    @UseGuards(JwtAuthGuard)
    @Get('email/:email')
    async findOneByEmail(@Param('email') email: string) {
    return await this.medicService.findOneByEmail(email);
    }

    
    @Post()
    async create(@Body() medicDto: MedicDto) {
    const medic: MedicEntity = plainToInstance(MedicEntity, medicDto);
    return await this.medicService.create(medic);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':medicId')
    async update(@Param('medicId') medicId: string, @Body() medicDto: MedicDto) {
    const medic: MedicEntity = plainToInstance(MedicEntity, medicDto);
    return await this.medicService.update(medicId, medic);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':medicId')
    @HttpCode(204)
    async delete(@Param('medicId') medicId: string) {
      return await this.medicService.delete(medicId);
    }

}