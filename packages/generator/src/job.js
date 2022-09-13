import axios from "axios";

function getHeader() {
  return [{ id: "name", title: "name" }];
}

async function getData(count) {
  try {
    const arr = [
      "Cashier",
      "Sales associate",
      "Customer service representative",
      "Visual merchandiser",
      "Buyer",
      "Store manager",
      "Inventory control specialist",
    ];
    const data = arr.slice(count);
    return data.map((elem) => ({
      name: elem,
    }));
  } catch (err) {
    console.log("Error with getting job data");
  }
}

export default async function generateJob(count, folder, createCsvWriter) {
  const csvWriter = createCsvWriter({
    path: folder + "job.csv",
    header: getHeader(),
  });

  const data = await getData(count);

  csvWriter
    .writeRecords(data)
    .then(() => console.log("Job successfully generated"));
  return data;
}
