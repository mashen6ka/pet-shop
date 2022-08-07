import { OrderEntity, OrderItemEntity } from "../entity";
import { IOrderRepo } from "../repository";

export default class OrderService {
  private repo: IOrderRepo;

  constructor(repo: IOrderRepo) {
    this.repo = repo;
  }

  async createOrder(order: OrderEntity): Promise<Number> {
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

  async createOrderProduct(
    orderId: number,
    productId: number,
    quantity: number
  ): Promise<void> {
    await this.repo.createOrderItem(orderId, productId, quantity);
  }

  async deleteOrderProduct(orderId: number, productId: number): Promise<void> {
    await this.repo.deleteOrderItem(orderId, productId);
  }

  async updateOrderProduct(
    orderId: number,
    productId: number,
    quantity: number
  ): Promise<void> {
    await this.repo.updateOrderItem(orderId, productId, quantity);
  }

  async getOrderItemList(orderId: number): Promise<Array<OrderItemEntity>> {
    const orderItemList = await this.repo.getOrderItemList(orderId);
    return orderItemList;
  }
}
