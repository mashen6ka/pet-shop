import "reflect-metadata";
import CountryService from "../../src/service/CountryService";
import PgCountryRepoMock from "../../src/test/PgCountryRepoMock";

describe("Country", () => {
  it("Service", async () => {
    const countryRepo = new PgCountryRepoMock();
    const countryService = new CountryService(countryRepo);

    const country = countryRepo.country;

    const createCountryRes = await countryService.createCountry(country);
    expect(createCountryRes).toEqual(country.id);

    const updateCountryRes = await countryService.updateCountry(country);
    expect(updateCountryRes).toEqual(undefined);

    const deleteCountryRes = await countryService.deleteCountry(country.id);
    expect(deleteCountryRes).toEqual(undefined);

    const getCountryRes = await countryService.getCountry(country.id);
    expect(getCountryRes).toEqual(country);

    const getCountryListRes = await countryService.getCountryList();
    expect(getCountryListRes).toEqual([country]);
  });
});
