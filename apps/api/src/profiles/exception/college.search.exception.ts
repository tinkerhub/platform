import { HttpException, HttpStatus } from '@nestjs/common';

export class CollegeSearchException extends HttpException {
  constructor(err: any) {
    super({ success: false, error: 'College search error' }, HttpStatus.BAD_REQUEST);
    /* eslint-disable */
    console.log({ err });
  }
}
