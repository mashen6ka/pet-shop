import { IsInt, IsString, Min, Max, IsOptional } from "class-validator";

export default class OrderStatusEntity {
  @IsOptional()
  @IsInt()
  id: number;

  @IsString()
  name: string;

  constructor(partial: Partial<OrderStatusEntity>) {
    Object.assign(this, partial);
  }
}
