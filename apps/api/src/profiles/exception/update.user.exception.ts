import { HttpException, HttpStatus } from '@nestjs/common';

export class UpdateUserException extends HttpException {
  constructor(err: any) {
    super({ success: false, error: "Could'nt update user info" }, HttpStatus.BAD_REQUEST);
    /* eslint-disable */
    console.log({ err });
  }
}
