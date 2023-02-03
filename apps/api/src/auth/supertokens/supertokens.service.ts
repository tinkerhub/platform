import { Inject, Injectable } from '@nestjs/common';
import supertokens from 'supertokens-node';
import Session from 'supertokens-node/recipe/session';
import Passwordless from 'supertokens-node/recipe/passwordless';

import { ConfigInjectionToken, AuthModuleConfig } from '../config.interface';
import { SmsService } from './sms.service';
import { VoiceService } from './voice.service';

@Injectable()
export class SupertokensService {
  constructor(
    @Inject(ConfigInjectionToken) private config: AuthModuleConfig,
    private readonly smsService: SmsService,
    private readonly voiceService: VoiceService
  ) {
    const send = (phone: string, userInput: string, type: 'VOICE' | 'SMS') => {
      if (type === 'VOICE') {
        this.voiceService.voiceSend(phone, userInput);
      } else if (type === 'SMS') {
        this.smsService.smsSend(phone, userInput);
      } else {
        throw new Error('Invalid type');
      }
    };
    supertokens.init({
      appInfo: config.appInfo,
      supertokens: {
        connectionURI: config.connectionURI,
        apiKey: config.apiKey,
      },
      recipeList: [
        Passwordless.init({
          flowType: 'USER_INPUT_CODE',
          contactMethod: 'PHONE',
          smsDelivery: {
            override: (originalImplementation) => ({
              ...originalImplementation,
              async sendSms({ phoneNumber, userInputCode, userContext }) {
                // eslint-disable-next-line no-underscore-dangle
                const { type } = await userContext._default.request.getJSONBody();
                // @ts-ignore
                await send(phoneNumber, userInputCode, type);
              },
            }),
          },
        }),
        Session.init(),
      ],
    });
  }
}
