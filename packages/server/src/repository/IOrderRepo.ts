import { OrderEntity, ProductEntity } from "../entity";

export default interface IOrderRepo {
  createOrder: (order: OrderEntity) => Promise<Number>;
  updateOrder: (order: OrderEntity) => Promise<void>;
  deleteOrder: (id: number) => Promise<void>;
  getOrder: (id: number) => Promise<OrderEntity>;
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
  // getOrderProductList: (
  //   orderId: number,
  // ) => Promise<Array<void>>;
}
