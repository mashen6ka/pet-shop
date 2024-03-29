import { ManufacturerEntity } from "../entity";

export default interface IManufacturerRepo {
  createManufacturer: (manufacturer: ManufacturerEntity) => Promise<number>;
  updateManufacturer: (manufacturer: ManufacturerEntity) => Promise<void>;
  deleteManufacturer: (id: number) => Promise<void>;
  getManufacturer: (id: number) => Promise<ManufacturerEntity>;
  getManufacturerList: () => Promise<Array<ManufacturerEntity>>;
}
