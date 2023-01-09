import { OrderEntity, OrderItemEntity } from "../entity";
import { IOrderRepo } from "../repository";

export default class OrderService {
  private repo: IOrderRepo;

  constructor(repo: IOrderRepo) {
    this.repo = repo;
  }

  async createOrder(order: OrderEntity): Promise<number> {
    const id = await this.repo.createOrder(order);
    return id;
  }

  async updateOrder(order: OrderEntity): Promise<void> {
    await this.repo.updateOrder(order);
  }

  async deleteOrder(id: number): Promise<void> {
    await this.repo.deleteOrder(id);
  }

  async getOrder(id: number): Promise<OrderEntity> {
    const order = await this.repo.getOrder(id);
    return order;
  }

  async getOrderList(): Promise<Array<OrderEntity>> {
    const orderList = await this.repo.getOrderList();
    return orderList;
  }

  async createOrderProduct(
    orderId: number,
    productId: number,
    quantity: number
  ): Promise<void> {
    await this.repo.createOrderProduct(orderId, productId, quantity);
  }

  async deleteOrderProduct(orderId: number, productId: number): Promise<void> {
    await this.repo.deleteOrderProduct(orderId, productId);
  }

  async updateOrderProduct(
    orderId: number,
    productId: number,
    quantity: number
  ): Promise<void> {
    await this.repo.updateOrderProduct(orderId, productId, quantity);
  }

  async getOrderItemList(orderId: number): Promise<Array<OrderItemEntity>> {
    const orderItemList = await this.repo.getOrderItemList(orderId);
    return orderItemList;
  }
}
