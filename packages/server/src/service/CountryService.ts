import { CountryEntity } from "../entity";
import { ICountryRepo } from "../repository";

export default class CountryService {
  private repo: ICountryRepo;

  constructor(repo: ICountryRepo) {
    this.repo = repo;
  }

  async createCountry(country: CountryEntity): Promise<Number> {
    const id = await this.repo.createCountry(country);
    return id;
  }

  async updateCountry(country: CountryEntity): Promise<void> {
    await this.repo.updateCountry(country);
  }

  async deleteCountry(id: number): Promise<void> {
    await this.repo.deleteCountry(id);
  }

  async getCountry(id: number): Promise<CountryEntity> {
    const country = await this.repo.getCountry(id);
    return country;
  }

  async getCountryList(): Promise<Array<CountryEntity>> {
    const countryList = await this.repo.getCountryList();
    return countryList;
  }
}
