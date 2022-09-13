import axios from "axios";

function getHeader() {
  return [
    { id: "login", title: "login" },
    { id: "password", title: "password" },
    { id: "worker", title: "worker" },
    { id: "first_name", title: "first_name" },
    { id: "last_name", title: "last_name" },
    { id: "middle_name", title: "middle_name" },
    { id: "birthday", title: "birthday" },
    { id: "email", title: "email" },
    { id: "phone", title: "phone" },
    { id: "personal_discount", title: "personal_discount" },
  ];
}

async function getData(count) {
  const url = "https://random-data-api.com/api/v2/users";

  const data = [];
  const iter = count ? count : 15;
  for (let i = 0; i < iter; i++) {
    try {
      const res = await axios.get(url);
      const item = res.data;
      data.push({
        login: item.username,
        password: item.password,
        worker: Math.floor(Math.random() * 3) % 2 !== 0 ? true : false,
        first_name: item.first_name,
        last_name: item.last_name,
        middle_name: item.first_name, // мидл нэйма там нет
        birthday: item.date_of_birth,
        email: item.email,
        phone: item.phone_number
          .replaceAll(" ", "")
          .replaceAll("x", "")
          .replaceAll("-", "")
          .replaceAll(".", "")
          .slice(0, 15), // в бд ограничение такое
        personal_discount: 0, // впадлу пока реализовывать учет скидок
      });
    } catch (err) {
      console.log("Error with getting user data");
    }
  }
  return data;
}

export default async function generateUser(count, folder, createCsvWriter) {
  const csvWriter = createCsvWriter({
    path: folder + "user.csv",
    header: getHeader(),
  });

  const data = await getData(count);

  csvWriter
    .writeRecords(data)
    .then(() => console.log("User successfully generated"));

  return data;
}
