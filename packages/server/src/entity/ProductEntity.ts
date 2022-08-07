import { IsInt, IsString, Min, Max, IsOptional } from "class-validator";

export default class ProductEntity {
  @IsOptional()
  @IsInt()
  id: number;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsInt()
  countryId: number;

  @IsInt()
  manufacturerId: number;

  @IsInt()
  initialPrice: number;

  @IsInt()
  @Min(0)
  @Max(100)
  discount: number;

  constructor(partial: Partial<ProductEntity>) {
    Object.assign(this, partial);
  }
}
