import axios from "axios";

function getHeader() {
  return [
    { id: "name", title: "name" },
    { id: "address", title: "address" },
    { id: "KPP", title: "KPP" },
    { id: "INN", title: "INN" },
  ];
}

async function getData(count) {
  try {
    const data = [];
    const url = "https://random-data-api.com/api/address/random_address";
    const arr = [
      "Lapa Co.",
      "4 paws",
      "Bethoven",
      "PetShop",
      "Мыш",
      "UniVet",
    ].slice(count);
    // добавить норм генерацию компаний
    for (let name of arr) {
      const res = await axios.get(url);
      data.push({
        name: name,
        address: res.data.full_address.removeAll(","),
        KPP: Math.floor(Math.random() * 899999999) + 100000000, // 9 знаков
        INN: Math.floor(Math.random() * 899999999999) + 100000000000, // 12 знаков
      });
    }

    return data;
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
