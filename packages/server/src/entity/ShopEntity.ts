import { IsInt, IsString, IsOptional, IsJSON } from "class-validator";

export default class ShopEntity {
  @IsOptional()
  @IsInt()
  id: number;

  @IsString()
  address: string;

  // @IsJSON()
  workingHours: JSON;

  constructor(partial: Partial<ShopEntity>) {
    Object.assign(this, partial);
  }
}
