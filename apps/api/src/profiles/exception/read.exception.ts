import { HttpException, HttpStatus } from '@nestjs/common';

export class ReadException extends HttpException {
  constructor() {
    super({ success: false, error: "Could'nt read user info" }, HttpStatus.BAD_REQUEST);
  }
}
