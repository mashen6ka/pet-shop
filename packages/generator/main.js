const cheerio = require("cheerio");
const load = cheerio.load;
const fetch = require("node-fetch");

const url = "http://webcode.me";

async function getData() {
  const response = await fetch(url);
  const body = await response.text();

  let $ = load(body);

  let title = $("title");
  console.log(title.text());
}
  