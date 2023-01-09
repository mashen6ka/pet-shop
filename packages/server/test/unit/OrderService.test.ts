import "reflect-metadata";
import { Chance } from "chance";
import PgOrderRepo from "../../src/repository/PgOrderRepo";
import OrderService from "../../src/service/OrderService";
import { OrderBuilder, OrderItemBuilder, ProductBuilder } from "../builders";

let chance: Chance.Chance;

let orderRepo: PgOrderRepo;
let orderService: OrderService;

let orderBuilder: OrderBuilder;
let productBuilder: ProductBuilder;
let orderItemBuilder: OrderItemBuilder;

describe("OrderService", () => {
  beforeAll(() => {
    chance = Chance();
    orderRepo = new PgOrderRepo(null);
    orderService = new OrderService(orderRepo);
  });
  beforeEach(() => {
    orderBuilder = new OrderBuilder();
    productBuilder = new ProductBuilder();
    orderItemBuilder = new OrderItemBuilder();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("createOrder", async () => {
    const order = orderBuilder.build();

    jest
      .spyOn(PgOrderRepo.prototype, "createOrder")
      .mockResolvedValue(order.id);

    const response = await orderService.createOrder(order);
    expect(orderRepo.createOrder).toBeCalledTimes(1);
    expect(response).toEqual(order.id);
  });
  it("updateOrder", async () => {
    const order = orderBuilder.build();

    jest.spyOn(PgOrderRepo.prototype, "updateOrder").mockResolvedValue();

    const response = await orderService.updateOrder(order);
    expect(orderRepo.updateOrder).toBeCalledTimes(1);
    expect(response).toEqual(undefined);
  });
  it("deleteOrder", async () => {
    const order = orderBuilder.build();

    jest.spyOn(PgOrderRepo.prototype, "deleteOrder").mockResolvedValue();

    const response = await orderService.deleteOrder(order.id);
    expect(orderRepo.deleteOrder).toBeCalledTimes(1);
    expect(response).toEqual(undefined);
  });
  it("getOrder -- success", async () => {
    const order = orderBuilder.build();

    jest.spyOn(PgOrderRepo.prototype, "getOrder").mockResolvedValue(order);

    const response = await orderService.getOrder(order.id);
    expect(orderRepo.getOrder).toBeCalledTimes(1);
    expect(response).toEqual(order);
  });
  it("getOrder -- order not found", async () => {
    const order = orderBuilder.build();

    jest.spyOn(PgOrderRepo.prototype, "getOrder").mockResolvedValue(null);

    const response = await orderService.getOrder(order.id);
    expect(orderRepo.getOrder).toBeCalledTimes(1);
    expect(response).toEqual(null);
  });
  it("getOrderList -- non-empty list", async () => {
    const orderList = [];
    for (let i = 0; i < 3; i++) orderList.push(orderBuilder.build());

    jest
      .spyOn(PgOrderRepo.prototype, "getOrderList")
      .mockResolvedValue(orderList);

    const response = await orderService.getOrderList();
    expect(orderRepo.getOrderList).toBeCalledTimes(1);
    expect(response).toEqual(orderList);
  });
  it("getOrderList -- empty list", async () => {
    jest.spyOn(PgOrderRepo.prototype, "getOrderList").mockResolvedValue([]);

    const response = await orderService.getOrderList();
    expect(orderRepo.getOrderList).toBeCalledTimes(1);
    expect(response).toEqual([]);
  });
  it("deleteOrderProduct", async () => {
    const product = productBuilder.build();
    const order = orderBuilder.build();

    jest.spyOn(PgOrderRepo.prototype, "deleteOrderProduct").mockResolvedValue();

    const response = await orderService.deleteOrderProduct(
      order.id,
      product.id
    );
    expect(orderRepo.deleteOrderProduct).toBeCalledTimes(1);
    expect(response).toEqual(undefined);
  });
  it("updateOrderProduct", async () => {
    const order = orderBuilder.build();
    const product = productBuilder.build();
    const quantity = chance.natural({ min: 1, max: 10 });

    jest.spyOn(PgOrderRepo.prototype, "updateOrderProduct").mockResolvedValue();

    const response = await orderService.updateOrderProduct(
      order.id,
      product.id,
      quantity
    );
    expect(orderRepo.updateOrderProduct).toBeCalledTimes(1);
    expect(response).toEqual(undefined);
  });
  it("getOrderItemList", async () => {
    const order = orderBuilder.build();
    const orderItemList = [];
    for (let i = 0; i < 3; i++) orderItemList.push(orderItemBuilder.build());

    jest
      .spyOn(PgOrderRepo.prototype, "getOrderItemList")
      .mockResolvedValue(orderItemList);

    const response = await orderService.getOrderItemList(order.id);
    expect(orderRepo.getOrderItemList).toBeCalledTimes(1);
    expect(response).toEqual(orderItemList);
  });
});
