import { Type } from "class-transformer";
import { IsInt } from "class-validator";
import ProductEntity from "./ProductEntity";

export default class OrderItemEntity {
  @Type(() => ProductEntity)
  product: ProductEntity;

  @IsInt()
  quantity: number;

  constructor(partial: Partial<OrderItemEntity>) {
    Object.assign(this, partial);
  }
}
