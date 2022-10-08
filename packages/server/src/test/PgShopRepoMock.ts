import { ShopEntity } from "../entity";
import { PgShopRepo } from "../repository";

export default class PgShopRepoMock extends PgShopRepo {
  shop: ShopEntity;

  constructor() {
    super(null);
    this.shop = new ShopEntity({
      id: 256,
      address: "Proletarskiy pr-t 7a",
      workingHours: JSON.parse(`{"to": 23, "from": 8}`),
      phone: "+79104135660",
    });

    jest
      .spyOn(PgShopRepoMock.prototype, "createShop")
      .mockImplementation((shop: ShopEntity) => {
        const res = this.shop.id;
        return new Promise(function (resolve, reject) {
          resolve(res);
        });
      });

    jest
      .spyOn(PgShopRepo.prototype, "updateShop")
      .mockImplementation((shop: ShopEntity) => {
        return new Promise(function (resolve, reject) {
          resolve();
        });
      });

    jest
      .spyOn(PgShopRepo.prototype, "deleteShop")
      .mockImplementation((id: Number) => {
        return new Promise(function (resolve, reject) {
          resolve();
        });
      });

    jest
      .spyOn(PgShopRepo.prototype, "getShop")
      .mockImplementation((id: number) => {
        const res = this.shop;
        return new Promise(function (resolve, reject) {
          resolve(res);
        });
      });

    jest.spyOn(PgShopRepo.prototype, "getShopList").mockImplementation(() => {
      const res = [this.shop];
      return new Promise(function (resolve, reject) {
        resolve(res);
      });
    });
  }
}
