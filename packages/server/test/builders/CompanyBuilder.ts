import { CompanyEntity } from "../../src/entity";
import Chance from "chance";

export default class CompanyBuilder {
  company: CompanyEntity;

  constructor() {
    const chance = new Chance();

    this.company = new CompanyEntity({
      id: chance.natural(),
      name: chance.string(),
      KPP: chance.string({ length: 9 }),
      INN: chance.string({ length: 12 }),
      address: chance.address(),
    });
  }

  build() {
    return this.company;
  }
}
