import axios from "axios";

function getHeader() {
  return [
    { id: "product_id", title: "product_id" },
    { id: "shop_id", title: "shop_id" },
    { id: "quantity", title: "quantity" },
  ];
}

async function getData(count, productList, shopList) {
  const minQty = 0;
  const maxQty = 50;

  const data = [];
  try {
    for (let i = 0; i < productList.length; i++) {
      for (let j = 0; j < shopList.length; j++) {
        data.push({
          product_id: i + 1,
          shop_id: j + 1,
          quantity: Math.floor(Math.random() * (maxQty - minQty + 1) + minQty),
        });
      }
    }
  } catch (err) {
    console.log("Error with getting product__shop data");
  }
  return data;
}

export default async function generateProductShop(
  count,
  folder,
  createCsvWriter,
  { productList, shopList }
) {
  const csvWriter = createCsvWriter({
    path: folder + "product__shop.csv",
    header: getHeader(),
  });

  const data = await getData(count, productList, shopList);

  csvWriter
    .writeRecords(data)
    .then(() => console.log("Product__shop successfully generated"));
  return data;
}
