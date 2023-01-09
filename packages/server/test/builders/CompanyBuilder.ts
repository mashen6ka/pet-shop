import { CompanyEntity } from "../../src/entity";
import Chance from "chance";

export default class CompanyBuilder {
  company: CompanyEntity;

  constructor() {
    const chance = new Chance();

    this.company = new CompanyEntity({
      id: chance.natural(),
      name: chance.string(),
      KPP: chance.string(),
      INN: chance.string(),
      address: chance.string(),
    });
  }

  build() {
    return this.company;
  }
}
