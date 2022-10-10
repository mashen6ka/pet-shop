import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import axios from "axios";

async function main() {
  const rl = readline.createInterface({ input, output });
  while (true) {
    printMainMenu();

    const optMain = parseInt(await rl.question("Option number: "));
    if (optMain === 0) {
      rl.close();
      break;
    }
    const entityList = Object.keys(api);
    const sectionName = entityList[optMain - 1];
    printMenuSection(sectionName as apiKey);
    const optSection = parseInt(await rl.question("Option number: "));

    if (optSection != 0) {
      try {
        const reqType = api[sectionName as apiKey][optSection - 1].type;
        const reqPath = api[sectionName as apiKey][optSection - 1].path;
        const reqParams = api[sectionName as apiKey][optSection - 1].params;
        let res;
        console.log("Params template: ", reqParams);
        if (reqType === "post") {
          const payload = JSON.parse(
            await rl.question("Input data in JSON format: ")
          );
          res = await axios.post(serverAddress + reqPath, payload, {
            withCredentials: true,
            headers: {
              Cookie: `${cookie.name}=${cookie.value}`,
            },
          });
        } else {
          const params = await rl.question("Input query params: ");
          res = await axios.get(serverAddress + reqPath + "?" + params, {
            withCredentials: true,
            headers: {
              Cookie: `${cookie.name}=${cookie.value}`,
            },
          });
        }
        if (reqPath === "/user/authn") {
          cookie.name = "PET-SHOP";
          cookie.value = res.data.data.token;
        }
        console.log("Response status: ", res.status);
        console.log("Response data: ", res.data);
      } catch (err) {
        console.log("Error occured: ", new Error(err).message);
      }
    }
  }
}

function printMainMenu() {
  const entityList = Object.keys(api);
  console.log("Choose an entity to process: \n");
  console.log("0. Exit");
  entityList.forEach((entity, index) => {
    console.log(`${index + 1}. ${entity}`);
  });
}

function printMenuSection(section: apiKey) {
  const methodList = api[section];
  console.log("Choose a method: \n");
  console.log("0. Return back;");
  methodList.forEach((method, index) => {
    console.log(`${index + 1}. type: ${method.type}, path: ${method.path}`);
  });
}

const api = {
  user: [
    {
      type: "post",
      path: "/user/authn",
      params: `{"login":"#","password":"#"}`,
    },
    {
      type: "post",
      path: "/user/create",
      params: `{"firstName":"#","lastName":"#","middleName":"#","email":"#","phone":"#","personalDiscount":#,"birthday":"#","login":"#","password":"#","worker":#}`,
    },
    {
      type: "post",
      path: "/user/update",
      params: `{"id":#,"firstName":"#","lastName":"#","middleName":"#","email":"#","phone":"#","personalDiscount":#,"birthday":"#","login":"#","password":"#","worker":#}`,
    },
    { type: "post", path: "/user/delete", params: `{"id":#}` },
    { type: "get", path: "/user/get", params: `-` },
    { type: "get", path: "/user/get/list", params: `-` },
    { type: "get", path: "/user/get/company/list", params: `-` },
    { type: "get", path: "/user/get/order/list", params: `-` },
    { type: "post", path: "/user/create/company", params: `{"companyId":#}` },
    { type: "post", path: "/user/delete/company", params: `{"companyId":#}` },
  ],
  product: [
    {
      type: "post",
      path: "/product/create",
      params: `{"name":#,"description":#,"countryId":#,"manufacturerId":#,"initialPrice":#,"discount":#}`,
    },
    {
      type: "post",
      path: "/product/update",
      params: `{"id":#,"name":"#","description":"#","countryId":#,"manufacturerId":#,"initialPrice":#,"discount":#}`,
    },
    { type: "post", path: "/product/delete", params: `` },
    { type: "get", path: "/product/get", params: `id=#` },
    { type: "get", path: "/product/get/list", params: `-` },
    { type: "get", path: "/product/get/shop/list", params: `productId=#` },
  ],
  shop: [
    {
      type: "post",
      path: "/shop/create",
      params: `{"address":"#","workingHours":{"to": #, "from": #}, "phone":"#"}`,
    },
    {
      type: "post",
      path: "/shop/update",
      params: `{"id":#,"address":"#","workingHours":{"to": #, "from": #}, "phone":"#"}`,
    },
    { type: "post", path: "/shop/delete", params: `{"id":#}` },
    { type: "get", path: "/shop/get", params: `id=#` },
    { type: "get", path: "/shop/get/list", params: `-` },
  ],
  company: [
    {
      type: "post",
      path: "/company/create",
      params: `{"name":"#","KPP":"#","INN":"#","address":"#"}`,
    },
    {
      type: "post",
      path: "/company/update",
      params: `{"id":#,"name":"#","KPP":"#","INN":"#","address":"#"}`,
    },
    { type: "post", path: "/company/delete", params: `{"id"=#}` },
    { type: "get", path: "/company/get", params: `id=#` },
    { type: "get", path: "/company/get/list", params: `-` },
  ],
  order: [
    {
      type: "post",
      path: "/order/create",
      params: `{"statusId":#,"shopId":#}`,
    },
    {
      type: "post",
      path: "/order/update",
      params: `{"userId":#,"id":#,"statusId":#,"shopId":#}`,
    },
    { type: "post", path: "/order/delete", params: `{"id"=#}` },
    { type: "get", path: "/order/get", params: `id=#` },
    { type: "get", path: "/order/get/list", params: `-` },
    {
      type: "post",
      path: "/order/create/item",
      params: `{"orderId":#,"productId":#,"quantity":#}`,
    },
    {
      type: "post",
      path: "/order/delete/item",
      params: `{"orderId":#,"productId":#}`,
    },
    {
      type: "post",
      path: "/order/update/item",
      params: `{"orderId":#,"productId":#,"quantity":#}`,
    },
    { type: "get", path: "/order/get/item/list", params: `orderId=#` },
  ],
  manufacturer: [
    { type: "post", path: "/manufacturer/create", params: `{"name":"#"}` },
    {
      type: "post",
      path: "/manufacturer/update",
      params: `{"id":#,"name":"#"}`,
    },
    { type: "post", path: "/manufacturer/delete", params: `{"id"=#}` },
    { type: "get", path: "/manufacturer/get", params: `id=#` },
    { type: "get", path: "/manufacturer/get/list", params: `-` },
  ],
  country: [
    { type: "post", path: "/country/create", params: `{"name":"#"}` },
    { type: "post", path: "/country/update", params: `{"id":#,"name":"#"}` },
    { type: "post", path: "/country/delete", params: `{"id"=#}` },
    { type: "get", path: "/country/get", params: `id=#` },
    { type: "get", path: "/country/get/list", params: `-` },
  ],
  orderStatus: [
    { type: "post", path: "/order/status/create", params: `{"name":"#"}` },
    {
      type: "post",
      path: "/order/status/update",
      params: `{"id":#,"name":"#"}`,
    },
    { type: "post", path: "/order/status/delete", params: `{"id"=#}` },
    { type: "get", path: "/order/status/get", params: `id=#` },
    { type: "get", path: "/order/status/get/list", params: `-` },
  ],
};

const cookie = { name: <string>null, value: <string>null };
const serverAddress = "http://localhost:3000";

type apiKey = keyof typeof api;

main();
