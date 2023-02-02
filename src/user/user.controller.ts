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
export class UserController {

    constructor(private readonly userService: UserService) {}
    
    @UseGuards(JwtAuthGuard)
    @Get(':email')
    async findOne(@Param('email') email: string) {
    return await this.userService.findOne(email);
    }

    @Post('signup')
    async create(@Body() userDto: UserDto) {
      const user: UserEntity = plainToInstance(UserEntity, userDto);
      return await this.userService.create(user);
    }
/*    
    constructor(private readonly authService: AuthService){}
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Req() req) {
        return this.authService.login(req);
    }
    */
}