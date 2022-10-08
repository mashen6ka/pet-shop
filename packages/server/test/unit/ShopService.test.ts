import "reflect-metadata";
import ShopService from "../../src/service/ShopService";
import PgShopRepoMock from "../../src/test/PgShopRepoMock";

describe("Shop", () => {
  it("Service", async () => {
    const shopRepo = new PgShopRepoMock();
    const shopService = new ShopService(shopRepo);

    const shop = shopRepo.shop;

    const createShopRes = await shopService.createShop(shop);
    expect(createShopRes).toEqual(shop.id);

    const updateShopRes = await shopService.updateShop(shop);
    expect(updateShopRes).toEqual(undefined);

    const deleteShopRes = await shopService.deleteShop(shop.id);
    expect(deleteShopRes).toEqual(undefined);

    const getShopRes = await shopService.getShop(shop.id);
    expect(getShopRes).toEqual(shop);

    const getShopListRes = await shopService.getShopList();
    expect(getShopListRes).toEqual([shop]);
  });
});
