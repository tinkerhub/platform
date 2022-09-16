import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return {
      ok: true,
      message: 'server running succesfully',
    };
  }
}
