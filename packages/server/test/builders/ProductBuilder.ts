import { ProductEntity } from "../../src/entity";
import Chance from "chance";

export default class ProductBuilder {
  product: ProductEntity;

  constructor() {
    const chance = new Chance();

    this.product = new ProductEntity({
      id: chance.natural(),
      name: chance.string(),
      description: chance.string(),
      countryId: chance.natural(),
      manufacturerId: chance.natural(),
      initialPrice: chance.floating(),
      discount: chance.natural({ min: 0, max: 100 }),
      imgUrl: chance.url(),
    });
  }

  build() {
    return this.product;
  }
}
