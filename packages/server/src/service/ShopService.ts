import { identity } from "lodash";
import { ShopEntity } from "../entity";
import { IShopRepo } from "../repository";

export default class ShopService {
  private repo: IShopRepo;

  constructor(repo: IShopRepo) {
    this.repo = repo;
  }

  async createShop(shop: ShopEntity): Promise<number> {
    const id = await this.repo.createShop(shop);
    return id;
  }

  async updateShop(shop: ShopEntity): Promise<void> {
    await this.repo.updateShop(shop);
  }

  async deleteShop(id: number): Promise<void> {
    await this.repo.deleteShop(id);
  }

  async getShop(id: number): Promise<ShopEntity> {
    const shop = await this.repo.getShop(id);
    return shop;
  }

  async getShopList(): Promise<Array<ShopEntity>> {
    const shopList = await this.repo.getShopList();
    return shopList;
  }
}
