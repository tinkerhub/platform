import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateIf,
} from 'class-validator';

export class CreateProfileDto {
  @ApiProperty()
  authId: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ValidateIf((object) => object.description === 'Student')
  @IsString()
  collegeId: string;

  @ValidateIf((object) => object.description === 'Student')
  @IsNumber()
  passYear: number;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsString()
  district: string;

  @IsNotEmpty()
  @Type(() => Date)
  dob: Date;

  @IsString()
  house: string;

  @ValidateIf((object) => object.pin != null)
  @IsNumber()
  pin: number;

  @IsNotEmpty()
  @IsBoolean()
  mentor: boolean;

  mobile: string;

  @IsString()
  pronoun: string;

  @IsArray()
  skills: Array<string>;

  @IsString()
  street: string;
}
