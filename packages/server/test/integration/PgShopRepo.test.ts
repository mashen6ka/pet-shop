import "reflect-metadata";
import { ShopEntity } from "../../src/entity";
import { PgShopRepo } from "../../src/repository";
import ShopService from "../../src/service/ShopService";
import { connectDB } from "../../src/common";

describe("Shop", () => {
  it("Repository", async () => {
    const conn = connectDB("postgres", "postgres");
    const shopRepo = new PgShopRepo(conn);

    const shop = new ShopEntity({
      id: 256,
      address: "Proletarskiy pr-t 7a",
      workingHours: JSON.parse(`{"to": 23, "from": 8}`),
      phone: "+79104135660",
    });

    const createShopRes = await shopRepo.createShop(shop);
    expect(createShopRes).toEqual(expect.any(Number));

    shop.id = createShopRes;
    const updateShopRes = await shopRepo.updateShop(shop);
    expect(updateShopRes).toEqual(undefined);

    const getShopRes = await shopRepo.getShop(shop.id);
    expect(getShopRes).toEqual(shop);

    const getShopListRes = await shopRepo.getShopList();
    expect(getShopListRes.length).not.toBe(0);

    const deleteShopRes = await shopRepo.deleteShop(shop.id);
    expect(deleteShopRes).toEqual(undefined);
  });
});
