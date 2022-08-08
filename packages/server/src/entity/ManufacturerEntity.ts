import { IsInt, IsString, Min, Max, IsOptional } from "class-validator";

export default class ManufacturerEntity {
  @IsOptional()
  @IsInt()
  id: number;

  @IsString()
  name: string;

  constructor(partial: Partial<ManufacturerEntity>) {
    Object.assign(this, partial);
  }
}
