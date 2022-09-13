import axios from "axios";

function getHeader() {
  return [
    { id: "user_id", title: "user_id" },
    { id: "company_id", title: "company_id" },
  ];
}

async function getData(count, userList, companyList) {
  function randomId(arr) {
    const minId = 1;
    const maxId = arr.length;

    return Math.floor(Math.random() * (maxId - minId + 1) + minId);
  }
  const data = [];
  const iter = count ? count : 15;
  for (let i = 0; i < iter; i++) {
    try {
      data.push({
        user_id: randomId(userList),
        company_id: randomId(companyList),
      });
    } catch (err) {
      console.log("Error with getting user__company data");
    }
  }
  return data;
}

export default async function generateUserCompany(
  count,
  folder,
  createCsvWriter,
  { userList, companyList }
) {
  const csvWriter = createCsvWriter({
    path: folder + "user__company.csv",
    header: getHeader(),
  });

  const data = await getData(count, userList, companyList);

  csvWriter
    .writeRecords(data)
    .then(() => console.log("User__company successfully generated"));
  return data;
}
