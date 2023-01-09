import "reflect-metadata";
import ProductService from "../../src/service/ProductService";
import PgProductRepo from "../../src/repository/PgProductRepo";
import { ProductBuilder, ShopBuilder } from "../builders";

let productRepo: PgProductRepo;
let productService: ProductService;

let productBuilder: ProductBuilder;
let shopBuilder: ShopBuilder;

describe("ProductService", () => {
  beforeAll(() => {
    productRepo = new PgProductRepo(null);
    productService = new ProductService(productRepo);
  });
  beforeEach(() => {
    productBuilder = new ProductBuilder();
    shopBuilder = new ShopBuilder();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("createProduct", async () => {
    const product = productBuilder.build();

    jest
      .spyOn(PgProductRepo.prototype, "createProduct")
      .mockResolvedValue(product.id);

    const response = await productService.createProduct(product);
    expect(productRepo.createProduct).toHaveBeenCalledTimes(1);
    expect(response).toEqual(product.id);
  });
  it("updateProduct", async () => {
    const product = productBuilder.build();

    jest.spyOn(PgProductRepo.prototype, "updateProduct").mockResolvedValue();

    const response = await productService.updateProduct(product);
    expect(productRepo.updateProduct).toHaveBeenCalledTimes(1);
    expect(response).toEqual(undefined);
  });
  it("deleteProduct", async () => {
    const product = productBuilder.build();

    jest.spyOn(PgProductRepo.prototype, "deleteProduct").mockResolvedValue();

    const response = await productService.deleteProduct(product.id);
    expect(productRepo.deleteProduct).toHaveBeenCalledTimes(1);
    expect(response).toEqual(undefined);
  });
  it("getProduct -- success", async () => {
    const product = productBuilder.build();

    jest
      .spyOn(PgProductRepo.prototype, "getProduct")
      .mockResolvedValue(product);

    const response = await productService.getProduct(product.id);
    expect(productRepo.getProduct).toHaveBeenCalledTimes(1);
    expect(response).toEqual(product);
  });
  it("getProduct -- product not found", async () => {
    const product = productBuilder.build();

    jest.spyOn(PgProductRepo.prototype, "getProduct").mockResolvedValue(null);

    const response = await productService.getProduct(product.id);
    expect(productRepo.getProduct).toHaveBeenCalledTimes(1);
    expect(response).toEqual(null);
  });
  it("getProductList -- non-empty list", async () => {
    const productList = [];
    for (let i = 0; i < 3; i++) productList.push(productBuilder.build());

    jest
      .spyOn(PgProductRepo.prototype, "getProductList")
      .mockResolvedValue(productList);

    const response = await productService.getProductList();
    expect(productRepo.getProductList).toHaveBeenCalledTimes(1);
    expect(response).toEqual(productList);
  });
  it("getProductList -- empty list", async () => {
    jest.spyOn(PgProductRepo.prototype, "getProductList").mockResolvedValue([]);

    const response = await productService.getProductList();
    expect(productRepo.getProductList).toHaveBeenCalledTimes(1);
    expect(response).toEqual([]);
  });
  it("getProductShopList -- non-empty list", async () => {
    const product = productBuilder.build();
    const shopList = [];
    for (let i = 0; i < 3; i++) shopList.push(shopBuilder.build());

    jest
      .spyOn(PgProductRepo.prototype, "getProductShopList")
      .mockResolvedValue(shopList);

    const response = await productService.getProductShopList(product.id);
    expect(productRepo.getProductShopList).toHaveBeenCalledTimes(1);
    expect(response).toEqual(shopList);
  });
  it("getProductShopList -- empty list", async () => {
    const product = productBuilder.build();
    jest
      .spyOn(PgProductRepo.prototype, "getProductShopList")
      .mockResolvedValue([]);

    const response = await productService.getProductShopList(product.id);
    expect(productRepo.getProductShopList).toHaveBeenCalledTimes(1);
    expect(response).toEqual([]);
  });
});
