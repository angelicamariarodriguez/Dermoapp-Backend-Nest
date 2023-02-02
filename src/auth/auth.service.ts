import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import constants from '../shared/security/constants';
import { UserService } from '../user/user.service';
import { UserEntity } from 'src/user/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService
    ) {}

    async validateUser(username: string, password: string): Promise<any> {
        const user: UserEntity = await this.usersService.findOne(username);
        if (user && user.password === password) {
            const { password, ...result } = user;
            console.log("Se valida usuario")
            return result;
        }
        return null;
    }

    async login(req: any) {
        const payload = { username: req.user.username, sub: req.user.id };
        return {
            token: this.jwtService.sign(payload, { privateKey: constants.JWT_SECRET, expiresIn:constants.JWT_EXPIRES_IN }),
        };
    }

}