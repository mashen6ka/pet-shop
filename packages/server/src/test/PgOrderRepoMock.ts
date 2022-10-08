import { OrderEntity, OrderItemEntity, ProductEntity } from "../entity";
import { PgOrderRepo } from "../repository";

export default class PgOrderRepoMock extends PgOrderRepo {
  order: OrderEntity;
  product: ProductEntity;
  orderItem: OrderItemEntity;
  quantity: number;

  constructor() {
    super(null);
    this.order = new OrderEntity({
      id: 512,
      userId: 256,
      companyId: 64,
      statusId: 2,
      createdAt: new Date("2022-11-05"),
      completedAt: new Date("2022-11-10"),
      shopId: 32,
    });
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
    this.orderItem = new OrderItemEntity({
      product: this.product,
      quantity: 2,
    });
    this.quantity = 5;

    jest
      .spyOn(PgOrderRepoMock.prototype, "createOrder")
      .mockImplementation((order: OrderEntity) => {
        const res = this.order.id;
        return new Promise(function (resolve, reject) {
          resolve(res);
        });
      });

    jest
      .spyOn(PgOrderRepo.prototype, "updateOrder")
      .mockImplementation((order: OrderEntity) => {
        return new Promise(function (resolve, reject) {
          resolve();
        });
      });

    jest
      .spyOn(PgOrderRepo.prototype, "deleteOrder")
      .mockImplementation((id: Number) => {
        return new Promise(function (resolve, reject) {
          resolve();
        });
      });

    jest
      .spyOn(PgOrderRepo.prototype, "getOrder")
      .mockImplementation((id: number) => {
        const res = this.order;
        return new Promise(function (resolve, reject) {
          resolve(res);
        });
      });

    jest.spyOn(PgOrderRepo.prototype, "getOrderList").mockImplementation(() => {
      const res = [this.order];
      return new Promise(function (resolve, reject) {
        resolve(res);
      });
    });

    jest
      .spyOn(PgOrderRepo.prototype, "createOrderItem")
      .mockImplementation(
        (orderId: number, productId: number, quantity: number) => {
          return new Promise(function (resolve, reject) {
            resolve();
          });
        }
      );

    jest
      .spyOn(PgOrderRepo.prototype, "deleteOrderItem")
      .mockImplementation((orderId: number, productId: number) => {
        return new Promise(function (resolve, reject) {
          resolve();
        });
      });

    jest
      .spyOn(PgOrderRepo.prototype, "updateOrderItem")
      .mockImplementation(
        (orderId: number, productId: number, quantity: number) => {
          return new Promise(function (resolve, reject) {
            resolve();
          });
        }
      );

    jest
      .spyOn(PgOrderRepo.prototype, "getOrderItemList")
      .mockImplementation((orderId: number) => {
        const res = [this.orderItem];
        return new Promise(function (resolve, reject) {
          resolve(res);
        });
      });
  }
}
