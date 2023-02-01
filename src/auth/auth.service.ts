import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import constants from '../shared/security/constants';
import { User } from '../user/user';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
   constructor(
       private usersService: UserService,
       private jwtService: JwtService
   ) {}

   async validateUser(username: string, password: string): Promise<any> {
       console.log('Prueba de mensaje', username);
       const user: User = await this.usersService.findOne(username);
       if (user && user.password === 'uuuuu') {
           const { password, ...result } = user;
           return result;
       }
       return null;
   }
   async login(user:any) {
        console.log('pruebsa de mensaje h' + user.username);
        const userDta: User = await this.usersService.findOne(user.username);
        if (userDta && userDta.password ===  user.password) {
          const payload = { username: user.username, sub: user.id };
          return {
              token: this.jwtService.sign(payload, { privateKey: constants.JWT_SECRET }),
          };
        } else {
            return null;
        }
    }

}