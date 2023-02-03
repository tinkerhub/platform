// @ts-ignore
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class VoiceService {
  constructor(private readonly httpService: HttpService, private configService: ConfigService) {}

  async voiceSend(phone: string, otp: string) {
    const headerValues = {
      authkey: this.configService.get<string>('MSG91_AUTH_KEY') as string,
      'content-type': 'application/json' as string,
    };

    await firstValueFrom(
      this.httpService
        .post(
          this.configService.get<string>('MSG91_VOICE_API_DOMAIN') as string,
          {
            // The voice teamplate has a single variable called otp
            // https://docs.msg91.com/p/tf9GTextN/e/jpzHDPS0Ygq/MSG91
            template: this.configService.get<string>('MSG91_VOICE_TEMPLATE_ID'),
            caller_id: this.configService.get<string>('MSG91_VOICE_CALLER_ID'),
            callback_url: this.configService.get<string>('MSG91_VOICE_CALLBACK_URL'),
            client_number: phone,
            variables: {
              otp: {
                value: otp,
                type: 'number',
                as_digits: true,
              },
            },
          },
          {
            headers: headerValues,
          }
        )
        .pipe(
          catchError((error: any) => {
            throw error;
          })
        )
    );
  }
}
