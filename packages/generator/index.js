import { createObjectCsvWriter as createCsvWriter } from "csv-writer";
import { parse } from "csv-parse";
import fs from "fs";
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
  await generateUser(1000, dataFolder, createCsvWriter);
  const userList = readData(dataFolder + "user.csv");

  await generateCompany(null, dataFolder, createCsvWriter);
  const companyList = readData(dataFolder + "company.csv");

  await generateUserCompany(1500, dataFolder, createCsvWriter, { userList, companyList }); // prettier-ignore
  const userCompanyList = readData(dataFolder + "user__company.csv");

  await generateStatus(null, dataFolder, createCsvWriter);
  const statusList = readData(dataFolder + "status.csv");

  // unused!
  // await generateJob(null, dataFolder, createCsvWriter);

  await generateShop(20, dataFolder, createCsvWriter);
  const shopList = readData(dataFolder + "shop.csv");

  await generateOrder(1000, dataFolder, createCsvWriter, { userList, companyList, statusList, shopList }); // prettier-ignore
  const orderList = readData(dataFolder + "order.csv");

  await generateCountry(null, dataFolder, createCsvWriter);
  const countryList = readData(dataFolder + "country.csv");

  await generateManufacturer(null, dataFolder, createCsvWriter); // prettier-ignore
  const manufacturerList = readData(dataFolder + "manufacturer.csv");

  // не забыть очистить папку img!
  await generateProduct(null, dataFolder, createCsvWriter, { countryList, manufacturerList }); // prettier-ignore
  const productList = readData(dataFolder + "product.csv");

  await generateOrderProduct(3000, dataFolder, createCsvWriter, { orderList, productList }); // prettier-ignore
  const orderProductList = readData(dataFolder + "order__product.csv");

  await generateProductShop(4000, dataFolder, createCsvWriter, { productList, shopList }); // prettier-ignore
  const productShopList = readData(dataFolder + "product__shop.csv");
}

function readData(filePath) {
  function getList(listRaw) {
    const header = listRaw.splice(0, 1)[0].split(",");
    const list = listRaw.map((item) => {
      const values = item.split(",");
      const entries = values.map((value, index) => {
        const key = header[index];
        return [key, value];
      });
      return Object.fromEntries(entries);
    });
    return list;
  }
  const data = fs.readFileSync(filePath, "utf-8");
  return getList(data.split("\n"));
}

generate();
