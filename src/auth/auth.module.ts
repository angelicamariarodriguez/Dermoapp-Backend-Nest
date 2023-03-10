import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserService } from '../user/user.service';
import constants from '../shared/security/constants';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local-strategy';
import { JwtStrategy } from './strategies/jwt-strategy';
import { UserEntity } from '../user/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
        UserModule,
        PassportModule,
        JwtModule.register({
          secret: constants.JWT_SECRET,
          signOptions: { expiresIn: constants.JWT_EXPIRES_IN },
        })
      ],
    providers: [AuthService, UserService, JwtService, LocalStrategy, JwtStrategy], 
    exports: [AuthService], controllers: [AuthController]
    
})
export class AuthModule {}