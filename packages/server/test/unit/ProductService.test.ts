import "reflect-metadata";
import ProductService from "../../src/service/ProductService";
import PgProductRepoMock from "../../src/test/PgProductRepoMock";

describe("Product", () => {
  it("Service", async () => {
    const productRepo = new PgProductRepoMock();
    const productService = new ProductService(productRepo);

    const product = productRepo.product;
    const shop = productRepo.shop;

    const createProductRes = await productService.createProduct(product);
    expect(createProductRes).toEqual(product.id);

    const updateProductRes = await productService.updateProduct(product);
    expect(updateProductRes).toEqual(undefined);

    const deleteProductRes = await productService.deleteProduct(product.id);
    expect(deleteProductRes).toEqual(undefined);

    const getProductRes = await productService.getProduct(product.id);
    expect(getProductRes).toEqual(product);

    const getProductListRes = await productService.getProductList();
    expect(getProductListRes).toEqual([product]);

    const getProductShopListRes = await productService.getProductShopList(
      product.id
    );
    expect(getProductShopListRes).toEqual([shop]);
  });
});
