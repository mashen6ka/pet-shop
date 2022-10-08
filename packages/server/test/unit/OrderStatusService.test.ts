import "reflect-metadata";
import OrderStatusService from "../../src/service/OrderStatusService";
import PgOrderStatusRepoMock from "../../src/test/PgOrderStatusRepoMock";

describe("OrderStatus", () => {
  it("Service", async () => {
    const orderStatusRepo = new PgOrderStatusRepoMock();
    const orderStatusService = new OrderStatusService(orderStatusRepo);

    const orderStatus = orderStatusRepo.orderStatus;

    const createOrderStatusRes = await orderStatusService.createOrderStatus(
      orderStatus
    );
    expect(createOrderStatusRes).toEqual(orderStatus.id);

    const updateOrderStatusRes = await orderStatusService.updateOrderStatus(
      orderStatus
    );
    expect(updateOrderStatusRes).toEqual(undefined);

    const deleteOrderStatusRes = await orderStatusService.deleteOrderStatus(
      orderStatus.id
    );
    expect(deleteOrderStatusRes).toEqual(undefined);

    const getOrderStatusRes = await orderStatusService.getOrderStatus(
      orderStatus.id
    );
    expect(getOrderStatusRes).toEqual(orderStatus);

    const getOrderStatusListRes = await orderStatusService.getOrderStatusList();
    expect(getOrderStatusListRes).toEqual([orderStatus]);
  });
});
