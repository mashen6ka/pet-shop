import { OrderStatusEntity } from "../entity";

export default interface IOrderStatusRepo {
  createOrderStatus: (orderStatus: OrderStatusEntity) => Promise<Number>;
  updateOrderStatus: (orderStatus: OrderStatusEntity) => Promise<void>;
  deleteOrderStatus: (id: number) => Promise<void>;
  getOrderStatus: (id: number) => Promise<OrderStatusEntity>;
  getOrderStatusList: () => Promise<Array<OrderStatusEntity>>;
}
