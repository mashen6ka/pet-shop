import { createObjectCsvWriter as createCsvWriter } from "csv-writer";
import generateCountry from "./src/country.js";
import generateShopPoint from "./src/shop_point.js";

const dataFolder = "./data/";

async function generate() {
  // await generateShopPoint(10, dataFolder, createCsvWriter);

  // await generateCountry(2, dataFolder, createCsvWriter);

  await generateCountry(2, dataFolder, createCsvWriter);
}

generate();
