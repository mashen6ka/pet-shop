import { identity } from "lodash";
import { ProductEntity } from "../entity";
import { IProductRepo } from "../repository";

export default class ProductService {
  private repo: IProductRepo;

  constructor(repo: IProductRepo) {
    this.repo = repo;
  }

  async createProduct(product: ProductEntity): Promise<Number> {
    const id = await this.repo.createProduct(product);
    return id;
  }

  async updateProduct(product: ProductEntity): Promise<void> {
    await this.repo.updateProduct(product);
  }

  async deleteProduct(id: number): Promise<void> {
    await this.repo.deleteProduct(id);
  }

  async getProduct(id: number): Promise<ProductEntity> {
    const product = await this.repo.getProduct(id);
    return product;
  }
}
