import { createObjectCsvWriter as createCsvWriter } from "csv-writer";
import generateCountry from "./src/country.js";
import generateProduct from "./src/product.js";
import generateShop from "./src/shop.js";

const dataFolder = "./data/";

async function generate() {
  // await generateShop(10, dataFolder, createCsvWriter);

  const countryList = await generateCountry(null, dataFolder, createCsvWriter);

  const productList = await generateProduct(countryList);
}

generate();
