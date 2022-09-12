import { IsInt, IsString, IsOptional, IsJSON } from "class-validator";

export default class ShopEntity {
  @IsOptional()
  @IsInt()
  id: number;

  @IsString()
  address: string;

  // @IsJSON()
  workingHours: JSON;

  @IsString()
  phone: string;

  constructor(partial: Partial<ShopEntity>) {
    Object.assign(this, partial);
  }
}
