import "reflect-metadata";
import PgManufacturerRepo from "../../src/repository/PgManufacturerRepo";
import ManufacturerService from "../../src/service/ManufacturerService";
import { ManufacturerBuilder } from "../builders";

let manufacturerRepo: PgManufacturerRepo;
let manufacturerService: ManufacturerService;

let manufacturerBuilder: ManufacturerBuilder;

describe("ManufacturerService", () => {
  beforeAll(() => {
    manufacturerRepo = new PgManufacturerRepo(null);
    manufacturerService = new ManufacturerService(manufacturerRepo);
  });
  beforeEach(() => {
    manufacturerBuilder = new ManufacturerBuilder();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("createManufacturer", async () => {
    const manufacturer = manufacturerBuilder.build();

    jest
      .spyOn(PgManufacturerRepo.prototype, "createManufacturer")
      .mockResolvedValue(manufacturer.id);

    const response = await manufacturerService.createManufacturer(manufacturer);
    expect(manufacturerRepo.createManufacturer).toHaveBeenCalledTimes(1);
    expect(response).toEqual(manufacturer.id);
  });
  it("updateManufacturer", async () => {
    const manufacturer = manufacturerBuilder.build();

    jest
      .spyOn(PgManufacturerRepo.prototype, "updateManufacturer")
      .mockResolvedValue();

    const response = await manufacturerService.updateManufacturer(manufacturer);
    expect(manufacturerRepo.updateManufacturer).toHaveBeenCalledTimes(1);
    expect(response).toEqual(undefined);
  });
  it("deleteManufacturer", async () => {
    const manufacturer = manufacturerBuilder.build();

    jest
      .spyOn(PgManufacturerRepo.prototype, "deleteManufacturer")
      .mockResolvedValue();

    const response = await manufacturerService.deleteManufacturer(
      manufacturer.id
    );
    expect(manufacturerRepo.deleteManufacturer).toHaveBeenCalledTimes(1);
    expect(response).toEqual(undefined);
  });
  it("getManufacturer -- success", async () => {
    const manufacturer = manufacturerBuilder.build();

    jest
      .spyOn(PgManufacturerRepo.prototype, "getManufacturer")
      .mockResolvedValue(manufacturer);

    const response = await manufacturerService.getManufacturer(manufacturer.id);
    expect(manufacturerRepo.getManufacturer).toHaveBeenCalledTimes(1);
    expect(response).toEqual(manufacturer);
  });
  it("getManufacturer -- manufacturer not found", async () => {
    const manufacturer = manufacturerBuilder.build();

    jest
      .spyOn(PgManufacturerRepo.prototype, "getManufacturer")
      .mockResolvedValue(null);

    const response = await manufacturerService.getManufacturer(manufacturer.id);
    expect(manufacturerRepo.getManufacturer).toHaveBeenCalledTimes(1);
    expect(response).toEqual(null);
  });
  it("getManufacturerList -- non-empty list", async () => {
    const manufacturerList = [];
    for (let i = 0; i < 3; i++)
      manufacturerList.push(manufacturerBuilder.build());

    jest
      .spyOn(PgManufacturerRepo.prototype, "getManufacturerList")
      .mockResolvedValue(manufacturerList);

    const response = await manufacturerService.getManufacturerList();
    expect(manufacturerRepo.getManufacturerList).toHaveBeenCalledTimes(1);
    expect(response).toEqual(manufacturerList);
  });
  it("getManufacturerList -- empty list", async () => {
    jest
      .spyOn(PgManufacturerRepo.prototype, "getManufacturerList")
      .mockResolvedValue([]);

    const response = await manufacturerService.getManufacturerList();
    expect(manufacturerRepo.getManufacturerList).toHaveBeenCalledTimes(1);
    expect(response).toEqual([]);
  });
});
