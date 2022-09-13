import axios from "axios";

function getHeader() {
  return [{ id: "name", title: "name" }];
}

async function getData(count) {
  try {
    const arr = [
      "Created",
      "Accepted",
      "Assembly",
      "Ready",
      "Completed",
      "Cancelled",
    ];
    const data = arr.slice(count);
    return data.map((elem) => ({
      name: elem,
    }));
  } catch (err) {
    console.log("Error with getting status data");
  }
}

export default async function generateStatus(count, folder, createCsvWriter) {
  const csvWriter = createCsvWriter({
    path: folder + "status.csv",
    header: getHeader(),
  });

  const data = await getData(count);

  csvWriter
    .writeRecords(data)
    .then(() => console.log("Status successfully generated"));
  return data;
}
