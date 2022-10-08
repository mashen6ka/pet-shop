import "reflect-metadata";
import { OrderStatusEntity } from "../../src/entity";
import { PgOrderStatusRepo } from "../../src/repository";
import OrderStatusService from "../../src/service/OrderStatusService";
import { connectDB } from "../common";

describe("OrderStatus", () => {
  it("Repository", async () => {
    const conn = connectDB("postgres", "postgres");
    const orderStatusRepo = new PgOrderStatusRepo(conn);

    const orderStatus = new OrderStatusEntity({
      id: 256,
      name: "Completed",
    });

    const createOrderStatusRes = await orderStatusRepo.createOrderStatus(
      orderStatus
    );
    expect(createOrderStatusRes).toEqual(expect.any(Number));

    orderStatus.id = createOrderStatusRes;
    const updateOrderStatusRes = await orderStatusRepo.updateOrderStatus(
      orderStatus
    );
    expect(updateOrderStatusRes).toEqual(undefined);

    const getOrderStatusRes = await orderStatusRepo.getOrderStatus(
      orderStatus.id
    );
    expect(getOrderStatusRes).toEqual(orderStatus);

    const getOrderStatusListRes = await orderStatusRepo.getOrderStatusList();
    expect(getOrderStatusListRes.length).not.toBe(0);

    const deleteOrderStatusRes = await orderStatusRepo.deleteOrderStatus(
      orderStatus.id
    );
    expect(deleteOrderStatusRes).toEqual(undefined);
  });
});
