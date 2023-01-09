import "reflect-metadata";
import PgOrderStatusRepo from "../../src/repository/PgOrderStatusRepo";
import OrderStatusService from "../../src/service/OrderStatusService";
import { OrderStatusBuilder } from "../builders";

let orderStatusRepo: PgOrderStatusRepo;
let orderStatusService: OrderStatusService;

let orderStatusBuilder: OrderStatusBuilder;

describe("OrderStatusService", () => {
  beforeAll(() => {
    orderStatusRepo = new PgOrderStatusRepo(null);
    orderStatusService = new OrderStatusService(orderStatusRepo);
  });
  beforeEach(() => {
    orderStatusBuilder = new OrderStatusBuilder();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("createOrderStatus", async () => {
    const orderStatus = orderStatusBuilder.build();

    jest
      .spyOn(PgOrderStatusRepo.prototype, "createOrderStatus")
      .mockResolvedValue(orderStatus.id);

    const response = await orderStatusService.createOrderStatus(orderStatus);
    expect(orderStatusRepo.createOrderStatus).toBeCalledTimes(1);
    expect(response).toEqual(orderStatus.id);
  });
  it("updateOrderStatus", async () => {
    const orderStatus = orderStatusBuilder.build();

    jest
      .spyOn(PgOrderStatusRepo.prototype, "updateOrderStatus")
      .mockResolvedValue();

    const response = await orderStatusService.updateOrderStatus(orderStatus);
    expect(orderStatusRepo.updateOrderStatus).toBeCalledTimes(1);
    expect(response).toEqual(undefined);
  });
  it("deleteOrderStatus", async () => {
    const orderStatus = orderStatusBuilder.build();

    jest
      .spyOn(PgOrderStatusRepo.prototype, "deleteOrderStatus")
      .mockResolvedValue();

    const response = await orderStatusService.deleteOrderStatus(orderStatus.id);
    expect(orderStatusRepo.deleteOrderStatus).toBeCalledTimes(1);
    expect(response).toEqual(undefined);
  });
  it("getOrderStatus -- success", async () => {
    const orderStatus = orderStatusBuilder.build();

    jest
      .spyOn(PgOrderStatusRepo.prototype, "getOrderStatus")
      .mockResolvedValue(orderStatus);

    const response = await orderStatusService.getOrderStatus(orderStatus.id);
    expect(orderStatusRepo.getOrderStatus).toBeCalledTimes(1);
    expect(response).toEqual(orderStatus);
  });
  it("getOrderStatus -- orderStatus not found", async () => {
    const orderStatus = orderStatusBuilder.build();

    jest
      .spyOn(PgOrderStatusRepo.prototype, "getOrderStatus")
      .mockResolvedValue(null);

    const response = await orderStatusService.getOrderStatus(orderStatus.id);
    expect(orderStatusRepo.getOrderStatus).toBeCalledTimes(1);
    expect(response).toEqual(null);
  });
  it("getOrderStatusList -- non-empty list", async () => {
    const orderStatusList = [];
    for (let i = 0; i < 3; i++)
      orderStatusList.push(orderStatusBuilder.build());

    jest
      .spyOn(PgOrderStatusRepo.prototype, "getOrderStatusList")
      .mockResolvedValue(orderStatusList);

    const response = await orderStatusService.getOrderStatusList();
    expect(orderStatusRepo.getOrderStatusList).toBeCalledTimes(1);
    expect(response).toEqual(orderStatusList);
  });
  it("getOrderStatusList -- empty list", async () => {
    jest
      .spyOn(PgOrderStatusRepo.prototype, "getOrderStatusList")
      .mockResolvedValue([]);

    const response = await orderStatusService.getOrderStatusList();
    expect(orderStatusRepo.getOrderStatusList).toBeCalledTimes(1);
    expect(response).toEqual([]);
  });
});
