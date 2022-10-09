import { ManufacturerEntity } from "../entity";
import { IManufacturerRepo } from "../repository";

export default class ManufacturerService {
  private repo: IManufacturerRepo;

  constructor(repo: IManufacturerRepo) {
    this.repo = repo;
  }

  async createManufacturer(manufacturer: ManufacturerEntity): Promise<number> {
    const id = await this.repo.createManufacturer(manufacturer);
    return id;
  }

  async updateManufacturer(manufacturer: ManufacturerEntity): Promise<void> {
    await this.repo.updateManufacturer(manufacturer);
  }

  async deleteManufacturer(id: number): Promise<void> {
    await this.repo.deleteManufacturer(id);
  }

  async getManufacturer(id: number): Promise<ManufacturerEntity> {
    const manufacturer = await this.repo.getManufacturer(id);
    return manufacturer;
  }

  async getManufacturerList(): Promise<Array<ManufacturerEntity>> {
    const manufacturerList = await this.repo.getManufacturerList();
    return manufacturerList;
  }
}
