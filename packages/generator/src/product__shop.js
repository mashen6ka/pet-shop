import axios from "axios";

function getHeader() {
  return [
    { id: "product_id", title: "product_id" },
    { id: "shop_id", title: "shop_id" },
    { id: "quantity", title: "quantity" },
  ];
}

async function getData(count, productList, shopList) {
  function randomId(arr) {
    const minId = 1;
    const maxId = arr.length;

    return Math.floor(Math.random() * (maxId - minId + 1) + minId);
  }
  const minQty = 0;
  const maxQty = 50;

  const data = [];
  const iter = count ? count : 15;
  for (let i = 0; i < iter; i++) {
    try {
      data.push({
        product_id: randomId(productList),
        shop_id: randomId(shopList),
        quantity: Math.floor(Math.random() * (maxQty - minQty + 1) + minQty),
      });
    } catch (err) {
      console.log("Error with getting product__shop data");
    }
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
