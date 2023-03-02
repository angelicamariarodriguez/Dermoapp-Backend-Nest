import { Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi, CreateCompletionRequest } from 'openai';
import { CreateAutodiagnosisDto } from './create-autodiagnosis.dto';


@Injectable()
export class AutodiagnosisService {
  private readonly openAIApi: OpenAIApi;

  constructor() {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });

    this.openAIApi = new OpenAIApi(configuration);
  }

  async createCompletion({
    question,
    model,
    temperature,
  }: CreateAutodiagnosisDto) {
    try {
      const params: CreateCompletionRequest = {
        prompt: question,
        model: model || 'text-davinci-003',
        temperature: temperature || 0.9,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      };
      const { data } = await this.openAIApi.createCompletion(params);

      return data;
    } catch (e) {
      throw new Error(e);
    }
  }
}