// @ts-ignore
import {HttpService} from '@nestjs/axios';
import {Injectable} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {catchError, firstValueFrom} from 'rxjs';

@Injectable()
export class SmsService {
    constructor(private readonly httpService: HttpService, private configService: ConfigService) {
    }

    async smsSend(phone: string, otp: string) {
        const headerValues = {
            authkey: this.configService.get<string>('MSG91_AUTH_KEY') as string,
            'content-type': 'application/json' as string,
        };

        await firstValueFrom(
            this.httpService
                .post(
                    this.configService.get<string>('MSG91_API_DOMAIN') as string,
                    {
                        template_id: this.configService.get<string>('MSG91_FLOW_ID'),
                        invisible: 0,
                        mobile: phone,
                        otp,
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
