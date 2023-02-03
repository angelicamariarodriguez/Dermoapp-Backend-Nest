import {IsDateString, IsEmail, IsNotEmpty, IsString, IsUrl} from 'class-validator';
export class UserDto {

 @IsNotEmpty()
 @IsEmail()
 readonly email: string;
 
 @IsString()
 @IsNotEmpty()
 readonly password: string;
 
}