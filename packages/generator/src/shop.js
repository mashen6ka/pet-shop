import axios from "axios";
import Chance from "chance";
const chance = new Chance();

function getHeader() {
  return [
    { id: "address", title: "address" },
    { id: "working_hours", title: "working_hours" },
    { id: "phone", title: "phone" },
  ];
}

async function getData(count) {
  function randomHours() {
    const minFrom = 7;
    const maxFrom = 10;
    const minTo = 18;
    const maxTo = 23;
    // const weekdays = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

    const data = {};
    // for (let day of weekdays) {
    const from = Math.floor(Math.random() * (maxFrom - minFrom + 1) + minFrom); //prettier-ignore
    const to = Math.floor(Math.random() * (maxTo - minTo + 1) + minTo);
    // data[day] = { from: from, to: to };
    // }
    data.from = from;
    data.to = to;

    return JSON.stringify(data);
  }

  const data = [];
  const iter = count ? count : 15;
  for (let i = 0; i < iter; i++) {
    try {
      data.push({
        address: chance.address().replaceAll(",", ""),
        working_hours: randomHours(),
        phone: chance.phone({ formatted: false }),
      });
    } catch (err) {
      console.log("Error with getting shop data", err);
    }
  }
  return data;
}

export default async function generateShop(count, folder, createCsvWriter) {
  const csvWriter = createCsvWriter({
    path: folder + "shop.csv",
    header: getHeader(),
  });

  const data = await getData(count);

  csvWriter
    .writeRecords(data)
    .then(() => console.log("Shop successfully generated"));

  return data;
}
