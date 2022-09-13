import { load as _load } from "cheerio";
import axios from "axios";

const load = _load;
const url = "https://4lapy.ru/brand/";

function getHeader() {
  return [{ id: "name", title: "name" }];
}

async function getData(count) {
  let response = await fetch(url);

  const body = await response.text();
  const $ = load(body);

  const data = $(".b-popular-brand-item__name")
    .toArray()
    .map((e) => $(e).text())
    .slice(count);
  return data.map((elem) => ({
    name: elem,
  }));
}

export default async function generateManufacturer(
  count,
  folder,
  createCsvWriter
) {
  const csvWriter = createCsvWriter({
    path: folder + "manufacturer.csv",
    header: getHeader(),
  });

  const data = await getData(count);

  csvWriter
    .writeRecords(data)
    .then(() => console.log("Manufacturer successfully generated"));

  return data;
}
