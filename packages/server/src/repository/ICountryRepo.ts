import { CountryEntity } from "../entity";

export default interface ICountryRepo {
  createCountry: (country: CountryEntity) => Promise<Number>;
  updateCountry: (country: CountryEntity) => Promise<void>;
  deleteCountry: (id: number) => Promise<void>;
  getCountry: (id: number) => Promise<CountryEntity>;
  getCountryList: () => Promise<Array<CountryEntity>>;
}
