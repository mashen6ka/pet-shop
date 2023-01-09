import "reflect-metadata";
import PgShopRepo from "../../src/repository/PgShopRepo";
import ShopService from "../../src/service/ShopService";
import { ShopBuilder } from "../builders";

let shopRepo: PgShopRepo;
let shopService: ShopService;

let shopBuilder: ShopBuilder;

describe("ShopService", () => {
  beforeAll(() => {
    shopRepo = new PgShopRepo(null);
    shopService = new ShopService(shopRepo);
  });
  beforeEach(() => {
    shopBuilder = new ShopBuilder();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("createShop", async () => {
    const shop = shopBuilder.build();

    jest.spyOn(PgShopRepo.prototype, "createShop").mockResolvedValue(shop.id);

    const response = await shopService.createShop(shop);
    expect(shopRepo.createShop).toHaveBeenCalledTimes(1);
    expect(response).toEqual(shop.id);
  });
  it("updateShop", async () => {
    const shop = shopBuilder.build();

    jest.spyOn(PgShopRepo.prototype, "updateShop").mockResolvedValue();

    const response = await shopService.updateShop(shop);
    expect(shopRepo.updateShop).toHaveBeenCalledTimes(1);
    expect(response).toEqual(undefined);
  });
  it("deleteShop", async () => {
    const shop = shopBuilder.build();

    jest.spyOn(PgShopRepo.prototype, "deleteShop").mockResolvedValue();

    const response = await shopService.deleteShop(shop.id);
    expect(shopRepo.deleteShop).toHaveBeenCalledTimes(1);
    expect(response).toEqual(undefined);
  });
  it("getShop -- success", async () => {
    const shop = shopBuilder.build();

    jest.spyOn(PgShopRepo.prototype, "getShop").mockResolvedValue(shop);

    const response = await shopService.getShop(shop.id);
    expect(shopRepo.getShop).toHaveBeenCalledTimes(1);
    expect(response).toEqual(shop);
  });
  it("getShop -- shop not found", async () => {
    const shop = shopBuilder.build();

    jest.spyOn(PgShopRepo.prototype, "getShop").mockResolvedValue(null);

    const response = await shopService.getShop(shop.id);
    expect(shopRepo.getShop).toHaveBeenCalledTimes(1);
    expect(response).toEqual(null);
  });
  it("getShopList -- non-empty list", async () => {
    const shopList = [];
    for (let i = 0; i < 3; i++) shopList.push(shopBuilder.build());

    jest.spyOn(PgShopRepo.prototype, "getShopList").mockResolvedValue(shopList);

    const response = await shopService.getShopList();
    expect(shopRepo.getShopList).toHaveBeenCalledTimes(1);
    expect(response).toEqual(shopList);
  });
  it("getShopList -- empty list", async () => {
    jest.spyOn(PgShopRepo.prototype, "getShopList").mockResolvedValue([]);

    const response = await shopService.getShopList();
    expect(shopRepo.getShopList).toHaveBeenCalledTimes(1);
    expect(response).toEqual([]);
  });
});
