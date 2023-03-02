import {IsNotEmpty, IsNumber, IsString} from "class-validator";

export class CreateAutodiagnosisDto {
    @IsString()
    question: string;

    @IsString()
    model?: string;

    @IsNumber()
    temperature?: number;
  }