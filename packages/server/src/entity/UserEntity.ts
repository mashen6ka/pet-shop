import { Type } from "class-transformer";
import {
  IsEmail,
  IsDate,
  IsPhoneNumber,
  IsInt,
  IsString,
  Min,
  Max,
  IsBoolean,
  IsOptional,
} from "class-validator";

export default class UserEntity {
  @IsOptional()
  @IsInt()
  id: number;

  @IsString()
  login: string;

  @IsString()
  password: string;

  @IsBoolean()
  worker: boolean;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  middleName: string;

  @IsDate()
  @Type(() => Date)
  birthday: Date;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsInt()
  @Min(0)
  @Max(100)
  personalDiscount: number;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
