import { CountryEntity } from "../entity";
import { PgCountryRepo } from "../repository";

export default class PgCountryRepoMock extends PgCountryRepo {
  country: CountryEntity;

  constructor() {
    super(null);
    this.country = new CountryEntity({
      id: 256,
      name: "Russia",
    });

    jest
      .spyOn(PgCountryRepoMock.prototype, "createCountry")
      .mockImplementation((country: CountryEntity) => {
        const res = this.country.id;
        return new Promise(function (resolve, reject) {
          resolve(res);
        });
      });

    jest
      .spyOn(PgCountryRepo.prototype, "updateCountry")
      .mockImplementation((country: CountryEntity) => {
        return new Promise(function (resolve, reject) {
          resolve();
        });
      });

    jest
      .spyOn(PgCountryRepo.prototype, "deleteCountry")
      .mockImplementation((id: Number) => {
        return new Promise(function (resolve, reject) {
          resolve();
        });
      });

    jest
      .spyOn(PgCountryRepo.prototype, "getCountry")
      .mockImplementation((id: number) => {
        const res = this.country;
        return new Promise(function (resolve, reject) {
          resolve(res);
        });
      });

    jest
      .spyOn(PgCountryRepo.prototype, "getCountryList")
      .mockImplementation(() => {
        const res = [this.country];
        return new Promise(function (resolve, reject) {
          resolve(res);
        });
      });
  }
}
