import { OrderStatusEntity } from "../../src/entity";
import Chance from "chance";

export default class OrderStatusBuilder {
  orderStatus: OrderStatusEntity;

  constructor() {
    const chance = new Chance();

    this.orderStatus = new OrderStatusEntity({
      id: chance.natural(),
      name: chance.string(),
    });
  }

  build() {
    return this.orderStatus;
  }
}
