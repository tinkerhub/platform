import { HttpException, HttpStatus } from '@nestjs/common';

export class CollegeCreateException extends HttpException {
  constructor(err: any) {
    super({ success: false, error: "Could'nt create college" }, HttpStatus.BAD_REQUEST);
    /* eslint-disable */
    console.log({ err });
  }
}
