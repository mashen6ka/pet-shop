import { AuthnEntity } from "../../src/entity";
import Chance from "chance";

export default class AuthnBuilder {
  authn: AuthnEntity;

  constructor() {
    const chance = new Chance();

    this.authn = new AuthnEntity({
      login: chance.string(),
      password: chance.string(),
    });
  }

  build() {
    return this.authn;
  }

  withLogin(login: string) {
    this.authn.login = login;
    return this;
  }

  withPassword(password: string) {
    this.authn.password = password;
    return this;
  }
}
