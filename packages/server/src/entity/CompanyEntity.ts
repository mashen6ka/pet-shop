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

export default class CompanyEntity {
  @IsOptional()
  @IsInt()
  id: number;

  @IsString()
  name: string;

  @IsString()
  KPP: string;

  @IsString()
  INN: string;

  @IsString()
  address: string;

  constructor(partial: Partial<CompanyEntity>) {
    Object.assign(this, partial);
  }
}
