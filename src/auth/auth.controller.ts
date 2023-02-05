import { Controller, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';

@Controller('auth')
@UseInterceptors(BusinessErrorsInterceptor)
export class AuthController {

   constructor(private readonly authService: AuthService){}
   @UseGuards(LocalAuthGuard)
   @Post('login')
   async login(@Req() req) {
       return this.authService.login(req);
   }
}