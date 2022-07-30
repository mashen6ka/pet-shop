import { Type } from "class-transformer";
import {
  IsEmail,
  IsDate,
  IsPhoneNumber,
  IsInt,
  IsString,
  IsOptional,
  IsNumber,
} from "class-validator";

export default class WorkerEntity {
  @IsOptional()
  @IsInt()
  id: number;

  @IsString()
  login: string;

  @IsString()
  password: string;

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

  @IsPhoneNumber()
  phone: string;

  @IsString()
  passportSeries: string;

  @IsString()
  passportNum: string;

  @IsString()
  INN: string;

  @IsNumber()
  jobId: number;

  @IsNumber()
  shopId: number;

  constructor(partial: Partial<WorkerEntity>) {
    Object.assign(this, partial);
  }
}
