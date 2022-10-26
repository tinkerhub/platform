// @ts-ignore
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class SmsService {
  constructor(private readonly httpService: HttpService) {}

  async smsSend(phone: string, otp: string) {
    const headerValues = {
      authkey: process.env.MSG91_AUTH_KEY as string,
      'content-type': 'application/json' as string,
    };

    await firstValueFrom(
      this.httpService
        .post(
          process.env.MSG91_API_DOMAIN as string,
          {
            flow_id: process.env.MSG91_FLOW_ID,
            sender: process.env.MSG91_SENDER_ID,
            short_url: process.env.MSG91_SHORT_URL,
            mobiles: phone,
            OTP: otp,
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
