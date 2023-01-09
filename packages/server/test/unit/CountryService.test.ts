import "reflect-metadata";
import PgCountryRepo from "../../src/repository/PgCountryRepo";
import CountryService from "../../src/service/CountryService";
import { CountryBuilder } from "../builders";

let countryRepo: PgCountryRepo;
let countryService: CountryService;

let countryBuilder: CountryBuilder;

describe("CountryService", () => {
  beforeAll(() => {
    countryRepo = new PgCountryRepo(null);
    countryService = new CountryService(countryRepo);
  });
  beforeEach(() => {
    countryBuilder = new CountryBuilder();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("createCountry", async () => {
    const country = countryBuilder.build();

    jest
      .spyOn(PgCountryRepo.prototype, "createCountry")
      .mockResolvedValue(country.id);

    const response = await countryService.createCountry(country);
    expect(countryRepo.createCountry).toHaveBeenCalledTimes(1);
    expect(response).toEqual(country.id);
  });
  it("updateCountry", async () => {
    const country = countryBuilder.build();

    jest.spyOn(PgCountryRepo.prototype, "updateCountry").mockResolvedValue();

    const response = await countryService.updateCountry(country);
    expect(countryRepo.updateCountry).toHaveBeenCalledTimes(1);
    expect(response).toEqual(undefined);
  });
  it("deleteCountry", async () => {
    const country = countryBuilder.build();

    jest.spyOn(PgCountryRepo.prototype, "deleteCountry").mockResolvedValue();

    const response = await countryService.deleteCountry(country.id);
    expect(countryRepo.deleteCountry).toHaveBeenCalledTimes(1);
    expect(response).toEqual(undefined);
  });
  it("getCountry -- success", async () => {
    const country = countryBuilder.build();

    jest
      .spyOn(PgCountryRepo.prototype, "getCountry")
      .mockResolvedValue(country);

    const response = await countryService.getCountry(country.id);
    expect(countryRepo.getCountry).toHaveBeenCalledTimes(1);
    expect(response).toEqual(country);
  });
  it("getCountry -- country not found", async () => {
    const country = countryBuilder.build();

    jest.spyOn(PgCountryRepo.prototype, "getCountry").mockResolvedValue(null);

    const response = await countryService.getCountry(country.id);
    expect(countryRepo.getCountry).toHaveBeenCalledTimes(1);
    expect(response).toEqual(null);
  });
  it("getCountryList -- non-empty list", async () => {
    const countryList = [];
    for (let i = 0; i < 3; i++) countryList.push(countryBuilder.build());

    jest
      .spyOn(PgCountryRepo.prototype, "getCountryList")
      .mockResolvedValue(countryList);

    const response = await countryService.getCountryList();
    expect(countryRepo.getCountryList).toHaveBeenCalledTimes(1);
    expect(response).toEqual(countryList);
  });
  it("getCountryList -- empty list", async () => {
    jest.spyOn(PgCountryRepo.prototype, "getCountryList").mockResolvedValue([]);

    const response = await countryService.getCountryList();
    expect(countryRepo.getCountryList).toHaveBeenCalledTimes(1);
    expect(response).toEqual([]);
  });
});
