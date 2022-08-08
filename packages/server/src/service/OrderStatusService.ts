import { OrderStatusEntity } from "../entity";
import { IOrderStatusRepo } from "../repository";

export default class OrderStatusService {
  private repo: IOrderStatusRepo;

  constructor(repo: IOrderStatusRepo) {
    this.repo = repo;
  }

  async createOrderStatus(orderStatus: OrderStatusEntity): Promise<Number> {
    const id = await this.repo.createOrderStatus(orderStatus);
    return id;
  }

  async updateOrderStatus(orderStatus: OrderStatusEntity): Promise<void> {
    await this.repo.updateOrderStatus(orderStatus);
  }

  async deleteOrderStatus(id: number): Promise<void> {
    await this.repo.deleteOrderStatus(id);
  }

  async getOrderStatus(id: number): Promise<OrderStatusEntity> {
    const orderStatus = await this.repo.getOrderStatus(id);
    return orderStatus;
  }

  async getOrderStatusList(): Promise<Array<OrderStatusEntity>> {
    const orderStatusList = await this.repo.getOrderStatusList();
    return orderStatusList;
  }
}
