import "reflect-metadata";
import OrderService from "../../src/service/OrderService";
import PgOrderRepoMock from "../../src/test/PgOrderRepoMock";

describe("Order", () => {
  it("Service", async () => {
    const orderRepo = new PgOrderRepoMock();
    const orderService = new OrderService(orderRepo);

    const order = orderRepo.order;
    const product = orderRepo.product;
    const orderItem = orderRepo.orderItem;
    const quantity = orderRepo.quantity;

    const createOrderRes = await orderService.createOrder(order);
    expect(createOrderRes).toEqual(order.id);

    const updateOrderRes = await orderService.updateOrder(order);
    expect(updateOrderRes).toEqual(undefined);

    const deleteOrderRes = await orderService.deleteOrder(order.id);
    expect(deleteOrderRes).toEqual(undefined);

    const getOrderRes = await orderService.getOrder(order.id);
    expect(getOrderRes).toEqual(order);

    const getOrderListRes = await orderService.getOrderList();
    expect(getOrderListRes).toEqual([order]);

    const deleteOrderProductRes = await orderService.deleteOrderProduct(
      order.id,
      product.id
    );
    expect(deleteOrderProductRes).toEqual(undefined);

    const updateOrderProductRes = await orderService.updateOrderProduct(
      order.id,
      product.id,
      quantity
    );
    expect(updateOrderProductRes).toEqual(undefined);

    const getOrderItemListRes = await orderService.getOrderItemList(order.id);
    expect(getOrderItemListRes).toEqual([orderItem]);
  });
});
