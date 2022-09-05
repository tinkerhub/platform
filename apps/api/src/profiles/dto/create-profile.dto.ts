import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsDateString, IsEmail, IsNotEmpty, IsString } from 'class-validator';

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

  @IsNotEmpty()
  @IsString()
  desc: string;

  @IsString()
  district: string;

  @IsNotEmpty()
  @IsDateString()
  dob: string;

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
