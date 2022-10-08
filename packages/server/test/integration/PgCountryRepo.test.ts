import "reflect-metadata";
import { CountryEntity } from "../../src/entity";
import { PgCountryRepo } from "../../src/repository";
import CountryService from "../../src/service/CountryService";
import { connectDB } from "../common";

describe("Country", () => {
  it("Repository", async () => {
    const conn = connectDB("postgres", "postgres");
    const countryRepo = new PgCountryRepo(conn);

    const country = new CountryEntity({
      id: 256,
      name: "Russia",
    });

    const createCountryRes = await countryRepo.createCountry(country);
    expect(createCountryRes).toEqual(expect.any(Number));

    country.id = createCountryRes;
    const updateCountryRes = await countryRepo.updateCountry(country);
    expect(updateCountryRes).toEqual(undefined);

    const getCountryRes = await countryRepo.getCountry(country.id);
    expect(getCountryRes).toEqual(country);

    const getCountryListRes = await countryRepo.getCountryList();
    expect(getCountryListRes.length).not.toBe(0);

    const deleteCountryRes = await countryRepo.deleteCountry(country.id);
    expect(deleteCountryRes).toEqual(undefined);
  });
});
