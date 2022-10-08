import "reflect-metadata";
import { ManufacturerEntity } from "../../src/entity";
import { PgManufacturerRepo } from "../../src/repository";
import ManufacturerService from "../../src/service/ManufacturerService";
import { connectDB } from "../common";

describe("Manufacturer", () => {
  it("Repository", async () => {
    const conn = connectDB("postgres", "postgres");
    const manufacturerRepo = new PgManufacturerRepo(conn);

    const manufacturer = new ManufacturerEntity({
      id: 256,
      name: "Little One",
    });

    const createManufacturerRes = await manufacturerRepo.createManufacturer(
      manufacturer
    );
    expect(createManufacturerRes).toEqual(expect.any(Number));

    manufacturer.id = createManufacturerRes;
    const updateManufacturerRes = await manufacturerRepo.updateManufacturer(
      manufacturer
    );
    expect(updateManufacturerRes).toEqual(undefined);

    const getManufacturerRes = await manufacturerRepo.getManufacturer(
      manufacturer.id
    );
    expect(getManufacturerRes).toEqual(manufacturer);

    const getManufacturerListRes = await manufacturerRepo.getManufacturerList();
    expect(getManufacturerListRes.length).not.toBe(0);

    const deleteManufacturerRes = await manufacturerRepo.deleteManufacturer(
      manufacturer.id
    );
    expect(deleteManufacturerRes).toEqual(undefined);
  });
});
