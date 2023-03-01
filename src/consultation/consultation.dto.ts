/* eslint-disable prettier/prettier */
import {IsDateString, IsEmail, IsNotEmpty, IsString, IsUrl, IsNumber, IsBoolean} from 'class-validator';
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

 @IsNotEmpty()
 @IsString()
 readonly typeOfInjury: string;

 @IsNotEmpty()
 @IsString()
 readonly specialty: string;

 @IsString()
 readonly diagnosis: string;

 @IsNotEmpty()
 @IsBoolean()
 readonly asigned: boolean;

 //@IsNotEmpty()
 //readonly creationDate: string;
}
