import {IsEmail, IsNotEmpty, IsString, IsStrongPassword, IsUrl} from 'class-validator';

export class SymptomDto {

    @IsString()
    @IsNotEmpty()
    readonly typeOfInjury: string;
    
    @IsString()
    @IsNotEmpty()
    readonly specialty: string;

   
   }