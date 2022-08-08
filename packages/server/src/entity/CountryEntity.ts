import { IsInt, IsString, Min, Max, IsOptional } from "class-validator";

export default class CountryEntity {
  @IsOptional()
  @IsInt()
  id: number;

  @IsString()
  name: string;

  constructor(partial: Partial<CountryEntity>) {
    Object.assign(this, partial);
  }
}
