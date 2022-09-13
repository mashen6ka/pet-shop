import { createObjectCsvWriter as createCsvWriter } from "csv-writer";
import generateCompany from "./src/company.js";
import generateCountry from "./src/country.js";
import generateJob from "./src/job.js";
import generateManufacturer from "./src/manufacturer.js";
import generateOrder from "./src/order.js";
import generateOrderProduct from "./src/order__product.js";
import generateProduct from "./src/product.js";
import generateProductShop from "./src/product__shop.js";
import generateShop from "./src/shop.js";
import generateStatus from "./src/status.js";
import generateUser from "./src/user.js";
import generateUserCompany from "./src/user__company.js";

const dataFolder = "./data/";

async function generate() {
  const userList = await generateUser(null, dataFolder, createCsvWriter);

  const companyList = await generateCompany(null, dataFolder, createCsvWriter);

  const userCompanyList = await generateUserCompany(null, dataFolder, createCsvWriter, { userList, companyList }); // prettier-ignore

  const statusList = await generateStatus(null, dataFolder, createCsvWriter);

  const jobList = await generateJob(null, dataFolder, createCsvWriter);

  const shopList = await generateShop(null, dataFolder, createCsvWriter);

  const orderList = await generateOrder(null, dataFolder, createCsvWriter, { userList, companyList, statusList, shopList }); // prettier-ignore

  const countryList = await generateCountry(null, dataFolder, createCsvWriter);

  const manufacturerList = await generateManufacturer(null, dataFolder, createCsvWriter); // prettier-ignore

  const productList = await generateProduct(null, dataFolder, createCsvWriter, { countryList, manufacturerList }); // prettier-ignore

  const orderProductList = await generateOrderProduct(null, dataFolder, createCsvWriter, { orderList, productList }); // prettier-ignore

  const productShopList = await generateProductShop(null, dataFolder, createCsvWriter, { productList, shopList }); // prettier-ignore
}

generate();
