import axios from "axios";

function getShopHeader() {
  return [
    { id: "address", title: "address" },
    { id: "working_hours", title: "working_hours" },
  ];
}

async function getShopData(count) {
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

  const url = "https://random-data-api.com/api/address/random_address";
  const data = [];
  const iter = count ? count : 15;
  for (let i = 0; i < iter; i++) {
    try {
      const res = await axios.get(url);
      data.push({
        address: res.data.full_address,
        working_hours: randomHours(),
      });
    } catch (err) {
      console.log("Error with getting shop data");
    }
  }
  return data;
}

export default async function generateShop(count, folder, createCsvWriter) {
  const csvWriter = createCsvWriter({
    path: folder + "shop.csv",
    header: getShopHeader(),
  });

  const data = await getShopData(count);

  csvWriter
    .writeRecords(data)
    .then(() => console.log("Shop successfully generated"));
}
