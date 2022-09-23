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

  @ValidateIf((el) => el.desc === 'Student')
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

  @ValidateIf((el) => el.desc === 'Professional')
  @IsNotEmpty()
  @IsBoolean()
  mentor: boolean;

  // @IsNotEmpty()
  // @IsString()
  mobile: string;

  @IsString()
  pin: string;

  @IsString()
  pronoun: string;

  @IsArray()
  skills: string[];

  @IsString()
  street: string;

  @ValidateIf((el) => el.desc === 'Student')
  @IsString()
  CampusCommunityActive: string;
}
