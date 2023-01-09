import { CountryEntity } from "../../src/entity";
import Chance from "chance";

export default class CountryBuilder {
  country: CountryEntity;

  constructor() {
    const chance = new Chance();

    this.country = new CountryEntity({
      id: chance.natural(),
      name: chance.string(),
    });
  }

  build() {
    return this.country;
  }
}
