import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsEmail, IsNotEmpty, IsString, ValidateIf } from 'class-validator';

export class CreateProfileDto {
  @ApiProperty()
  authid: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  campus: string;

  @ValidateIf((el) => el.desc === 'Student')
  @IsString()
  @Type(() => Number)
  passyear: number;

  @IsNotEmpty()
  @IsString()
  desc: string;

  @IsString()
  district: string;

  @IsNotEmpty()
  @Type(() => Date)
  dob: Date;

  @IsString()
  house: string;

  @IsNotEmpty()
  @IsBoolean()
  mentor: boolean;

  mobile: string;

  @IsString()
  pin: string;

  @IsString()
  pronoun: string;

  @IsNotEmpty()
  @IsArray()
  skills: string[];

  @IsString()
  street: string;
}
