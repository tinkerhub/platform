import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return {
      message: 'api running succesfully',
      success: true,
    };
  }
}
