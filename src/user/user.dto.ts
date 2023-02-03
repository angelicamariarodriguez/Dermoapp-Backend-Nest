import {IsEmail, IsNotEmpty, IsString, IsStrongPassword, IsUrl} from 'class-validator';
import { Unique } from 'typeorm';
export class UserDto {


 @IsNotEmpty()
 @IsEmail()
 readonly email: string;
 

 @IsNotEmpty()
 @IsStrongPassword()
 readonly password: string;
 

 @IsNotEmpty()
 readonly rol: string;
 

}