import {IsEmail, IsNotEmpty, IsString, IsStrongPassword, IsUrl} from 'class-validator';
export class MedicDto {

 @IsString()
 @IsNotEmpty()
 readonly name: string;
 
 @IsString()
 @IsNotEmpty()
 readonly lastName: string;
 
 @IsString()
 @IsNotEmpty()
 readonly country: string;
 
 @IsString()
 @IsNotEmpty()
 readonly profLicense: string;
 
 @IsUrl()
 @IsNotEmpty()
 readonly profilePicture: string;

 @IsEmail()
 @IsNotEmpty()
 readonly email: string;

 @IsStrongPassword()
 @IsNotEmpty()
 readonly password: string;

 @IsString()
 @IsNotEmpty()
 readonly specialty: string;

}