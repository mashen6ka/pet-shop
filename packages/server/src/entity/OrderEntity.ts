import { Type } from "class-transformer";
import {
  IsInt,
  IsOptional,
  IsDate,
  IsArray,
  ValidateNested,
} from "class-validator";
import OrderItemEntity from "./OrderItemEntity";

export default class OrderEntity {
  @IsOptional()
  @IsInt()
  id: number;

  @IsInt()
  clientId: number;

  @IsOptional()
  @IsInt()
  companyId: number;

  @IsInt()
  statusId: number;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  createdAt: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  completedAt: Date;

  @IsInt()
  shopId: number;

  @IsInt()
  price: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemEntity)
  orderItemList: Array<OrderItemEntity>;

  constructor(partial: Partial<OrderEntity>) {
    Object.assign(this, partial);
  }
}
