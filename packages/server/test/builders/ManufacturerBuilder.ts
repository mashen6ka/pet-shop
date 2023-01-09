import { ManufacturerEntity } from "../../src/entity";
import Chance from "chance";

export default class ManufacturerBuilder {
  manufacturer: ManufacturerEntity;

  constructor() {
    const chance = new Chance();

    this.manufacturer = new ManufacturerEntity({
      id: chance.natural(),
      name: chance.string(),
    });
  }

  build() {
    return this.manufacturer;
  }
}
