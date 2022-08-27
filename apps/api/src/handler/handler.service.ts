import { Injectable } from '@nestjs/common';

interface Resp {
  message: string;
  data?: unknown;
}

@Injectable()
export class HandlerService {
  Success(resp: Resp) {
    return {
      ok: true,
      message: resp.message,
      data: resp.data,
    };
  }

  Fail(resp: Resp) {
    return {
      ok: false,
      message: resp.message,
    };
  }
}
