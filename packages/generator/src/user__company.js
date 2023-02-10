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

  const minCompanyQty = 0;
  const maxCompanyQty = 3;

  const data = [];
  try {
    for (let i = 0; i < userList.length; i++) {
      const companyQty = Math.floor(
        Math.random() * (maxCompanyQty - minCompanyQty + 1) + minCompanyQty
      );
      let usedCompanyIds = [];
      for (let j = 0; j < companyQty; j++) {
        let companyId = randomId(companyList);
        while (usedCompanyIds.includes(companyId)) {
          companyId = randomId(companyList);
        }
        usedCompanyIds.push(companyId);
        data.push({
          user_id: i + 1,
          company_id: companyId,
        });
      }
    }
  } catch (err) {
    console.log("Error with getting user__company data", err);
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
