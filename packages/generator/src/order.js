import axios from "axios";

function getHeader() {
  return [
    { id: "user_id", title: "user_id" },
    { id: "company_id", title: "company_id" },
    { id: "status_id", title: "status_id" },
    { id: "created_at", title: "created_at" },
    { id: "completed_at", title: "created_at" },
    { id: "shop_id", title: "shop_id" },
  ];
}

async function getData(count, userList, companyList, statusList, shopList) {
  function randomId(arr) {
    const minId = 1;
    const maxId = arr.length;

    return Math.floor(Math.random() * (maxId - minId + 1) + minId);
  }
  const data = [];
  const iter = count ? count : 15;
  for (let i = 0; i < iter; i++) {
    try {
      const statusId = randomId(statusList);
      data.push({
        user_id: randomId(userList),
        company_id: randomId(companyList),
        status_id: statusId,
        created_at: new Date().toISOString(),
        completed_at: statusId === 6 ? new Date().toISOString() : null, // completed
        shop_id: randomId(shopList),
      });
    } catch (err) {
      console.log("Error with getting order data");
    }
  }
  return data;
}

export default async function generateOrder(
  count,
  folder,
  createCsvWriter,
  { userList, companyList, statusList, shopList }
) {
  const csvWriter = createCsvWriter({
    path: folder + "order.csv",
    header: getHeader(),
  });

  const data = await getData(
    count,
    userList,
    companyList,
    statusList,
    shopList
  );

  csvWriter
    .writeRecords(data)
    .then(() => console.log("Order successfully generated"));
  return data;
}
