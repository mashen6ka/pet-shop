import { createObjectCsvWriter as createCsvWriter } from "csv-writer";
import generateCompany from "./src/company.js";
import generateCountry from "./src/country.js";
import generateJob from "./src/job.js";
import generateManufacturer from "./src/manufacturer.js";
import generateProduct from "./src/product.js";
import generateShop from "./src/shop.js";

const dataFolder = "./data/";

async function generate() {
  const companyList = await generateCompany(null, dataFolder, createCsvWriter);

  const jobList = await generateJob(null, dataFolder, createCsvWriter);

  const shopList = await generateShop(null, dataFolder, createCsvWriter);

  const countryList = await generateCountry(null, dataFolder, createCsvWriter);

  const manufacturerList = await generateManufacturer(null, dataFolder, createCsvWriter); // prettier-ignore

  const productList = await generateProduct(null, dataFolder, createCsvWriter, {
    countryList,
    manufacturerList,
  });
}

generate();
