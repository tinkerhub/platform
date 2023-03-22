import { HttpException, HttpStatus } from '@nestjs/common';

export class SkillSearchException extends HttpException {
  constructor(err: any) {
    super({ success: false, error: 'Skill search error' }, HttpStatus.BAD_REQUEST);
    /* eslint-disable */
    console.log({ err });
  }
}
