import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Configuration, OpenAIApi, CreateCompletionRequest } from 'openai';
import { CreateAutodiagnosisDto } from './create-autodiagnosis.dto';
import { ConsultationService } from '../consultation/consultation.service';
import { ConsultationEntity } from '../consultation/consultation.entity';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';


@Injectable()
export class AutodiagnosisService {
  private readonly openAIApi: OpenAIApi;

  constructor(private consultationService: ConsultationService) {
    const configuration = new Configuration({
      apiKey: "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" //process.env.OPENAI_API_KEY,
    });

    this.openAIApi = new OpenAIApi(configuration);
  }

  async createCompletion({
    question,
    consultationId,
  }: CreateAutodiagnosisDto) {
    try {
      const params: CreateCompletionRequest = {
        prompt: question,
        model: 'text-davinci-003',
        temperature: 0.9,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      };
      const { data } = await this.openAIApi.createCompletion(params);
      //console.log(data.choices[0].text);

      const consultation: ConsultationEntity = await this.consultationService.findOne(consultationId)
      consultation.diagnosis = data.choices[0].text;  
      consultation.asigned = true;  
      return await this.consultationService.update(consultationId, consultation);

    } catch (error) {
      //throw new BusinessLogicException("The consultation with the given id was not found or autodiagnosis unavailable", BusinessError.NOT_FOUND);//Error(e);
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'The consultation with the given id was not found or autodiagnosis unavailable',
      }, HttpStatus.NOT_FOUND, {
        cause: error
      });

    }
  }
}