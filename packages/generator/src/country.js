import axios from "axios";

function getHeader() {
  return [{ id: "name", title: "name" }];
}

async function getData(count) {
  const url = "http://country.io/names.json";

  try {
    const res = await axios.get(url);
    const data = Object.values(res.data).slice(0, count);
    return data.map((elem) => ({
      name: elem,
    }));
  } catch (err) {
    console.log("Error with getting country data");
  }
}

export default async function generateCountry(count, folder, createCsvWriter) {
  const csvWriter = createCsvWriter({
    path: folder + "country.csv",
    header: getHeader(),
  });

  const data = await getData(count);

  csvWriter
    .writeRecords(data)
    .then(() => console.log("Country successfully generated"));
  return data;
}
