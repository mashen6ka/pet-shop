import axios from "axios";

function getHeader() {
  return [{ id: "name", title: "name" }];
}

async function getData(count) {
  try {
    const arr = ["Lapa Co.", "4 paws", "Bethoven", "PetShop", "Мыш", "UniVet"];
    const data = arr.slice(count);
    return data.map((elem) => ({
      name: elem,
    }));
  } catch (err) {
    console.log("Error with getting company data");
  }
}

export default async function generateCompany(count, folder, createCsvWriter) {
  const csvWriter = createCsvWriter({
    path: folder + "company.csv",
    header: getHeader(),
  });

  const data = await getData(count);

  csvWriter
    .writeRecords(data)
    .then(() => console.log("Company successfully generated"));
  return data;
}
