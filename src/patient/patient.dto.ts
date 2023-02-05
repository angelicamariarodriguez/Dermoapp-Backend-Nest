/* eslint-disable prettier/prettier */
import {IsDateString, IsEmail, IsNotEmpty, IsString, IsUrl} from 'class-validator';
export class PatientDto {

 @IsString()
 @IsNotEmpty()
 readonly name: string;
 
 @IsNotEmpty()
 //@IsEmail()
 readonly email: string;
 
 @IsString()
 @IsNotEmpty()
 readonly password: string;
 
 //@IsDateString()
 @IsNotEmpty()
 readonly birthDate: string;
 
 @IsString()
 @IsNotEmpty()
 readonly country: string;

 @IsString()
 @IsNotEmpty()
 readonly skinType: string;

 //@IsUrl()
 @IsNotEmpty()
 readonly profilePicture: string;
}
/* archivo: src/patient/patient.dto.ts */