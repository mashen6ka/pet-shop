import { OrderEntity } from "../../src/entity";
import Chance from "chance";

export default class OrderBuilder {
  order: OrderEntity;

  constructor() {
    const chance = new Chance();

    this.order = new OrderEntity({
      id: chance.natural(),
      userId: chance.natural(),
      companyId: chance.natural(),
      statusId: chance.natural(),
      createdAt: chance.date(),
      completedAt: chance.date(),
      shopId: chance.natural(),
    });
  }

  build() {
    return this.order;
  }

  withUserId(userId: number) {
    this.order.userId = userId;
    return this;
  }

  withCompanyId(companyId: number) {
    this.order.companyId = companyId;
    return this;
  }

  withStatusId(statusId: number) {
    this.order.statusId = statusId;
    return this;
  }

  withShopId(shopId: number) {
    this.order.shopId = shopId;
    return this;
  }
}
