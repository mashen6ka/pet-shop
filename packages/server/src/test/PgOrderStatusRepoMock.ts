import { OrderStatusEntity } from "../entity";
import { PgOrderStatusRepo } from "../repository";

export default class PgOrderStatusRepoMock extends PgOrderStatusRepo {
  orderStatus: OrderStatusEntity;

  constructor() {
    super(null);
    this.orderStatus = new OrderStatusEntity({
      id: 256,
      name: "Completed",
    });

    jest
      .spyOn(PgOrderStatusRepoMock.prototype, "createOrderStatus")
      .mockImplementation((orderStatus: OrderStatusEntity) => {
        const res = this.orderStatus.id;
        return new Promise(function (resolve, reject) {
          resolve(res);
        });
      });

    jest
      .spyOn(PgOrderStatusRepo.prototype, "updateOrderStatus")
      .mockImplementation((orderStatus: OrderStatusEntity) => {
        return new Promise(function (resolve, reject) {
          resolve();
        });
      });

    jest
      .spyOn(PgOrderStatusRepo.prototype, "deleteOrderStatus")
      .mockImplementation((id: Number) => {
        return new Promise(function (resolve, reject) {
          resolve();
        });
      });

    jest
      .spyOn(PgOrderStatusRepo.prototype, "getOrderStatus")
      .mockImplementation((id: number) => {
        const res = this.orderStatus;
        return new Promise(function (resolve, reject) {
          resolve(res);
        });
      });

    jest
      .spyOn(PgOrderStatusRepo.prototype, "getOrderStatusList")
      .mockImplementation(() => {
        const res = [this.orderStatus];
        return new Promise(function (resolve, reject) {
          resolve(res);
        });
      });
  }
}
