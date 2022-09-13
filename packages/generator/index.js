import { createObjectCsvWriter as createCsvWriter } from "csv-writer";
import generateCountry from "./src/country.js";
import generateManufacturer from "./src/manufacturer.js";
import generateProduct from "./src/product.js";
import generateShop from "./src/shop.js";

const dataFolder = "./data/";

async function generate() {
  // await generateShop(10, dataFolder, createCsvWriter);

  const countryList = await generateCountry(null, dataFolder, createCsvWriter);

  const manufacturerList = await generateManufacturer(null, dataFolder, createCsvWriter); // prettier-ignore

  const productList = await generateProduct(null, dataFolder, createCsvWriter, {
    countryList,
    manufacturerList,
  });
}

generate();
