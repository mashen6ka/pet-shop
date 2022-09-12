import { ProductEntity, ShopEntity } from "../entity";

export default interface IProductRepo {
  createProduct: (product: ProductEntity) => Promise<Number>;
  updateProduct: (product: ProductEntity) => Promise<void>;
  deleteProduct: (id: number) => Promise<void>;
  getProduct: (id: number) => Promise<ProductEntity>;
  getProductList: () => Promise<Array<ProductEntity>>;
  getProductShopList: (productId: number) => Promise<Array<ShopEntity>>;
}
