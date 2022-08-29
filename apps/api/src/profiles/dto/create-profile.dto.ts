import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateProfileDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  Authid: string;

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
  @IsString()
  dob: string;

  @IsString()
  house: string;

  @IsNotEmpty()
  @IsBoolean()
  mentor: boolean;

  @IsString()
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
