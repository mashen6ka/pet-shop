import { OrderEntity, OrderItemEntity, ProductEntity } from "../entity";

export default interface IOrderRepo {
  createOrder: (order: OrderEntity) => Promise<number>;
  updateOrder: (order: OrderEntity) => Promise<void>;
  deleteOrder: (id: number) => Promise<void>;
  getOrder: (id: number) => Promise<OrderEntity>;
  getOrderList: () => Promise<Array<OrderEntity>>;
  createOrderProduct: (
    orderId: number,
    productId: number,
    quantity: number
  ) => Promise<void>;
  deleteOrderProduct: (orderId: number, productId: number) => Promise<void>;
  updateOrderProduct: (
    orderId: number,
    productId: number,
    quantity: number
  ) => Promise<void>;
  getOrderItemList: (orderId: number) => Promise<Array<OrderItemEntity>>;
}
