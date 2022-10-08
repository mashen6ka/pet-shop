function getHeader() {
  return [
    { id: "order_id", title: "order_id" },
    { id: "product_id", title: "product_id" },
    { id: "quantity", title: "quantity" },
  ];
}

async function getData(count, orderList, productList) {
  function randomId(arr) {
    const minId = 1;
    const maxId = arr.length;

    return Math.floor(Math.random() * (maxId - minId + 1) + minId);
  }
  const minQty = 1;
  const maxQty = 4;

  const data = [];
  for (let i = 1; i <= orderList.length; i++) {
    const itemQty = Math.floor(Math.random() * (maxQty - minQty + 1) + minQty);
    const usedProductIds = [];
    for (let j = 1; j <= itemQty; j++) {
      try {
        // if (data.length === count) break;
        let productId = randomId(productList);
        while (usedProductIds.includes(productId)) {
          productId = randomId(productList);
        }
        usedProductIds.push(productId);
        data.push({
          order_id: i,
          product_id: productId,
          quantity: Math.floor(Math.random() * (maxQty - minQty + 1) + minQty),
        });
      } catch (err) {
        console.log("Error with getting order__product data");
      }
    }
  }
  return data;
}

export default async function generateOrderProduct(
  count,
  folder,
  createCsvWriter,
  { orderList, productList }
) {
  const csvWriter = createCsvWriter({
    path: folder + "order__product.csv",
    header: getHeader(),
  });

  const data = await getData(count, orderList, productList);
  csvWriter
    .writeRecords(data)
    .then(() => console.log("Order__product successfully generated"));
  return data;
}
