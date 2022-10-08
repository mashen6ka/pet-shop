import { ProductEntity, ShopEntity } from "../entity";
import { PgProductRepo } from "../repository";

export default class PgProductRepoMock extends PgProductRepo {
  product: ProductEntity;
  shop: ShopEntity;

  constructor() {
    super(null);
    this.product = new ProductEntity({
      id: 256,
      name: "Hamster food",
      description: "Very yummy!",
      countryId: 32,
      manufacturerId: 64,
      initialPrice: 50000,
      discount: 0,
      imgUrl: "./hamster-food",
    });

    this.shop = new ShopEntity({
      id: 256,
      address: "Proletarskiy pr-t 7a",
      workingHours: JSON.parse(`{"to": 23, "from": 8}`),
      phone: "+79104135660",
    });

    jest
      .spyOn(PgProductRepoMock.prototype, "createProduct")
      .mockImplementation((product: ProductEntity) => {
        const res = this.product.id;
        return new Promise(function (resolve, reject) {
          resolve(res);
        });
      });

    jest
      .spyOn(PgProductRepo.prototype, "updateProduct")
      .mockImplementation((product: ProductEntity) => {
        return new Promise(function (resolve, reject) {
          resolve();
        });
      });

    jest
      .spyOn(PgProductRepo.prototype, "deleteProduct")
      .mockImplementation((id: Number) => {
        return new Promise(function (resolve, reject) {
          resolve();
        });
      });

    jest
      .spyOn(PgProductRepo.prototype, "getProduct")
      .mockImplementation((id: number) => {
        const res = this.product;
        return new Promise(function (resolve, reject) {
          resolve(res);
        });
      });

    jest
      .spyOn(PgProductRepo.prototype, "getProductList")
      .mockImplementation(() => {
        const res = [this.product];
        return new Promise(function (resolve, reject) {
          resolve(res);
        });
      });

    jest
      .spyOn(PgProductRepo.prototype, "getProductShopList")
      .mockImplementation(() => {
        const res = [this.shop];
        return new Promise(function (resolve, reject) {
          resolve(res);
        });
      });
  }
}
