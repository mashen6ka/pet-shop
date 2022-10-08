import "reflect-metadata";
import ManufacturerService from "../../src/service/ManufacturerService";
import PgManufacturerRepoMock from "../../src/test/PgManufacturerRepoMock";

describe("Manufacturer", () => {
  it("Service", async () => {
    const manufacturerRepo = new PgManufacturerRepoMock();
    const manufacturerService = new ManufacturerService(manufacturerRepo);

    const manufacturer = manufacturerRepo.manufacturer;

    const createManufacturerRes = await manufacturerService.createManufacturer(
      manufacturer
    );
    expect(createManufacturerRes).toEqual(manufacturer.id);

    const updateManufacturerRes = await manufacturerService.updateManufacturer(
      manufacturer
    );
    expect(updateManufacturerRes).toEqual(undefined);

    const deleteManufacturerRes = await manufacturerService.deleteManufacturer(
      manufacturer.id
    );
    expect(deleteManufacturerRes).toEqual(undefined);

    const getManufacturerRes = await manufacturerService.getManufacturer(
      manufacturer.id
    );
    expect(getManufacturerRes).toEqual(manufacturer);

    const getManufacturerListRes =
      await manufacturerService.getManufacturerList();
    expect(getManufacturerListRes).toEqual([manufacturer]);
  });
});
