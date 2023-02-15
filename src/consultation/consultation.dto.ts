/* eslint-disable prettier/prettier */
import {IsDateString, IsEmail, IsNotEmpty, IsString, IsUrl, IsNumber} from 'class-validator';
export class ConsultationDto {

 @IsString()
 @IsNotEmpty()
 readonly shape: string;
 
 @IsNotEmpty()
 @IsString()
 readonly distribution: string;
 
 @IsString()
 @IsNotEmpty()
 readonly comment: string;
 
 @IsString()
 @IsNotEmpty()
 readonly numberOfInjuries: string;
 
 //@IsUrl()
 @IsNotEmpty()
 readonly image: string;
}
/* archivo: src/patient/patient.dto.ts */