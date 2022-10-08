import { ManufacturerEntity } from "../entity";
import { PgManufacturerRepo } from "../repository";

export default class PgManufacturerRepoMock extends PgManufacturerRepo {
  manufacturer: ManufacturerEntity;

  constructor() {
    super(null);
    this.manufacturer = new ManufacturerEntity({
      id: 256,
      name: "Little One",
    });

    jest
      .spyOn(PgManufacturerRepoMock.prototype, "createManufacturer")
      .mockImplementation((manufacturer: ManufacturerEntity) => {
        const res = this.manufacturer.id;
        return new Promise(function (resolve, reject) {
          resolve(res);
        });
      });

    jest
      .spyOn(PgManufacturerRepo.prototype, "updateManufacturer")
      .mockImplementation((manufacturer: ManufacturerEntity) => {
        return new Promise(function (resolve, reject) {
          resolve();
        });
      });

    jest
      .spyOn(PgManufacturerRepo.prototype, "deleteManufacturer")
      .mockImplementation((id: Number) => {
        return new Promise(function (resolve, reject) {
          resolve();
        });
      });

    jest
      .spyOn(PgManufacturerRepo.prototype, "getManufacturer")
      .mockImplementation((id: number) => {
        const res = this.manufacturer;
        return new Promise(function (resolve, reject) {
          resolve(res);
        });
      });

    jest
      .spyOn(PgManufacturerRepo.prototype, "getManufacturerList")
      .mockImplementation(() => {
        const res = [this.manufacturer];
        return new Promise(function (resolve, reject) {
          resolve(res);
        });
      });
  }
}
