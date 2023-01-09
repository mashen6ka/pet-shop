import { ShopEntity } from "../../src/entity";
import Chance from "chance";

export default class ShopBuilder {
  shop: ShopEntity;

  constructor() {
    const chance = new Chance();

    this.shop = new ShopEntity({
      id: chance.natural(),
      address: chance.address(),
      workingHours: JSON.parse(
        `{"from": ${chance.natural({
          min: 7,
          max: 10,
        })}, "to": ${chance.natural({ min: 18, max: 23 })}}`
      ),
      phone: chance.phone({ formatted: true }),
    });
  }

  build() {
    return this.shop;
  }
}
