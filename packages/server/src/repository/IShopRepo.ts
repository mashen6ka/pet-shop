import { ShopEntity } from "../entity";

export default interface IShopRepo {
  createShop: (shop: ShopEntity) => Promise<Number>;
  updateShop: (shop: ShopEntity) => Promise<void>;
  deleteShop: (id: number) => Promise<void>;
  getShop: (id: number) => Promise<ShopEntity>;
  getShopList: () => Promise<Array<ShopEntity>>;
}
