import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { LocalAuthGuard } from '../auth/guards/local-auth.guard';
import { AuthService } from '../auth/auth.service';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { UserDto } from './user.dto';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users')
@UseInterceptors(BusinessErrorsInterceptor)
export class UserController {

    constructor(private readonly userService: UserService) {}
    
    @UseGuards(JwtAuthGuard)
    @Get(':userName')
    async findOne(@Param('userName') userName: string) {
    return await this.userService.findOne(userName);
    }

    @Post('signup')
    async create(@Body() userDto: UserDto) {
      const user: UserEntity = plainToInstance(UserEntity, userDto);
      return await this.userService.create(user);
    }
}