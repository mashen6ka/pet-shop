import { UserEntity } from "../../src/entity";
import Chance from "chance";

export default class UserBuilder {
  user: UserEntity;

  constructor() {
    const chance = new Chance();

    this.user = new UserEntity({
      id: chance.natural(),
      login: chance.string(),
      password: chance.string(),
      worker: chance.bool({ likelihood: 10 }),
      firstName: chance.first(),
      lastName: chance.last(),
      middleName: chance.first(),
      birthday: chance.birthday(),
      email: chance.email(),
      phone: chance.phone({ formatted: false }),
      personalDiscount: chance.natural({ min: 0, max: 100 }),
    });
  }

  build() {
    return this.user;
  }

  withWorker(worker: boolean) {
    this.user.worker = worker;
    return this;
  }
}
