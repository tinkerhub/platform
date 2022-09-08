import { HttpException, HttpStatus } from '@nestjs/common';

export class UpdateException extends HttpException {
  constructor() {
    super({ success: false, error: "Could'nt update user info" }, HttpStatus.BAD_REQUEST);
  }
}
