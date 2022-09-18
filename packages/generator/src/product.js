import { load as _load } from "cheerio";
import fs from "fs";
import axios from "axios";
import translate from "google-translate-api-x";

const imgFolder = "./img";
const load = _load;
const urlBase = "https://4lapy.ru";

// мб потом сделать нормально фул обход по категориям и по страницам, а пока сроки горят блин
const urlPageArr = [
  "/catalog/gryzuny-i-khorki/korm-gryzuni/?section_id=374&sort=popular&page=1",
  "/catalog/gryzuny-i-khorki/korm-gryzuni/?section_id=374&sort=popular&page=2",
  "/catalog/gryzuny-i-khorki/korm-gryzuni/?section_id=374&sort=popular&page=3",
  "/catalog/koshki/korm-koshki/?section_id=2&sort=popular&page=1",
  "/catalog/koshki/korm-koshki/?section_id=2&sort=popular&page=2",
  "/catalog/koshki/korm-koshki/?section_id=2&sort=popular&page=3",
  "/catalog/koshki/korm-koshki/?section_id=2&sort=popular&page=4",
  "/catalog/koshki/korm-koshki/?section_id=2&sort=popular&page=5",
  "/catalog/koshki/korm-koshki/?section_id=2&sort=popular&page=6",
  "/catalog/koshki/korm-koshki/?section_id=2&sort=popular&page=7",
  "/catalog/koshki/korm-koshki/?section_id=2&sort=popular&page=8",
  "/catalog/koshki/korm-koshki/?section_id=2&sort=popular&page=9",
  "/catalog/koshki/korm-koshki/?section_id=2&sort=popular&page=10",
  "/catalog/koshki/korm-koshki/?section_id=2&sort=popular&page=11",
  "/catalog/koshki/korm-koshki/?section_id=2&sort=popular&page=12",
  "/catalog/koshki/korm-koshki/?section_id=2&sort=popular&page=13",
  "/catalog/koshki/korm-koshki/?section_id=2&sort=popular&page=14",
  "/catalog/koshki/korm-koshki/?section_id=2&sort=popular&page=15",
  "/catalog/koshki/lezhaki-i-domiki-koshki/?section_id=97&sort=popular&page=1",
  "/catalog/koshki/lezhaki-i-domiki-koshki/?section_id=97&sort=popular&page=2",
  "/catalog/koshki/lezhaki-i-domiki-koshki/?section_id=97&sort=popular&page=3",
  "/catalog/koshki/lezhaki-i-domiki-koshki/?section_id=97&sort=popular&page=4",
  "/catalog/koshki/lezhaki-i-domiki-koshki/?section_id=97&sort=popular&page=5",
  "/catalog/sobaki/korm-sobaki/?section_id=165&sort=popular&page=1",
  "/catalog/sobaki/korm-sobaki/?section_id=165&sort=popular&page=2",
  "/catalog/sobaki/korm-sobaki/?section_id=165&sort=popular&page=3",
  "/catalog/sobaki/korm-sobaki/?section_id=165&sort=popular&page=4",
  "/catalog/sobaki/korm-sobaki/?section_id=165&sort=popular&page=5",
];

const downloadImg = (url, imgPath) =>
  axios({
    url,
    responseType: "stream",
  }).then(
    (response) =>
      new Promise((resolve, reject) => {
        response.data
          .pipe(fs.createWriteStream(imgPath))
          .on("finish", () => resolve())
          .on("error", (e) => reject(e));
      })
  );

function getProductHeader() {
  return [
    { id: "name", title: "name" },
    { id: "description", title: "description" },
    { id: "country_id", title: "country_id" },
    { id: "manufacturer_id", title: "manufacturer_id" },
    { id: "initial_price", title: "initial_price" },
    { id: "discount", title: "discount" },
    { id: "img_url", title: "img_url" },
  ];
}

async function getItemLinks(url) {
  const response = await fetch(url);
  const body = await response.text();

  const $ = load(body);

  let links = [];
  $(".b-common-item__description-wrap").each((index, value) => {
    let link = $(value).attr("href");
    links.push(link);
  });
  return links;
}

async function getItemData(links, countryList, manufacturerList) {
  let items = [];
  for (const link of links) {
    let response;
    try {
      response = await fetch(urlBase + link);
    } catch (err) {
      continue;
    }
    const body = await response.text();
    const $ = load(body);

    const name = $(".b-title.b-title--h1.b-title--card").text();
    const manufacturer = $(
      ".b-title.b-title--h2.b-title--inline.b-title--card"
    ).attr("title");
    const description = $(".rc-product-detail").text();
    const price = $(".b-plus-minus__count.js-plus-minus-count").attr(
      "data-one-price"
    );
    let country;
    $("div.b-characteristics-tab__characteristics-text").each(
      (index, element) => {
        const text = $(element).find("span").text();
        if (text === "Страна производства") {
          country = $(element).next().text().trim();
        }
      }
    );
    // тут еще можно украсть производителя и фул пак доп инфы

    const imgUrl = $(
      ".b-product-slider__photo-img.b-product-slider__photo-img--big.js-image-wrapper.js-zoom"
    ).attr("src");

    const imgName = link.replaceAll("/", "_").replaceAll(".html?offer=", "_");
    const imgPath = imgFolder + "/" + imgName + ".jpg";

    await downloadImg(urlBase + imgUrl, imgPath);

    const { text: nameTranslated } = await translate(name, { to: "en" });
    const { text: countryTranslated } = await translate(country, { to: "en" });
    const { text: descriptionTranslated } = await translate(description, {
      to: "en",
    });

    items.push({
      name: nameTranslated.replaceAll("\n", ""),
      description: descriptionTranslated.replaceAll("\n", ""),
      country_id: getIdByName(countryTranslated, countryList),
      manufacturer_id: getIdByName(manufacturer, manufacturerList),
      initial_price: parseInt(price * 100),
      discount: 0,
      img_url: "/img/" + imgName + ".jpg", // накринжила аче.....
    });
    console.log(items);
  }
  return items;
}

function getIdByName(name, list) {
  const minId = 1;
  const maxId = list.length;
  return (
    list?.map((e) => e.name)?.indexOf(name) + 1 ||
    Math.floor(Math.random() * (maxId - minId + 1) + minId)
  );
}

export default async function generateProduct(
  count,
  folder,
  createCsvWriter,
  { countryList, manufacturerList }
) {
  const dataRaw = [];
  try {
    for (const urlPage of urlPageArr) {
      const itemLinks = await getItemLinks(urlBase + urlPage);
      itemLinks.pop(); // последний айтем всегда - 'javascript:void(0);'
      dataRaw.push(await getItemData(itemLinks, countryList, manufacturerList));
      console.log("-- Generated a bunch of products --");
    }
  } catch (err) {
    console.log(err);
    return writeData(dataRaw);
  }
  return writeData(dataRaw);

  function writeData(dataRaw) {
    const data = dataRaw.flat().slice(count);
    const csvWriter = createCsvWriter({
      path: folder + "product.csv",
      header: getProductHeader(),
    });

    csvWriter
      .writeRecords(data)
      .then(() => console.log("Product successfully generated"));
    return data;
  }
}
