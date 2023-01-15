import { OrderStatusEntity } from "../../src/entity";
import Chance from "chance";
import { sample } from "lodash";

export default class OrderStatusBuilder {
  orderStatus: OrderStatusEntity;

  constructor() {
    const chance = new Chance();

    this.orderStatus = new OrderStatusEntity({
      id: chance.natural(),
      name: sample([
        "Created",
        "Accepted",
        "Assembly",
        "Ready",
        "Completed",
        "Cancelled",
      ]),
    });
  }

  build() {
    return this.orderStatus;
  }

  withName(name: string) {
    this.orderStatus.name = name;
    return this;
  }
}
