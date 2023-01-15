import axios from "axios";
import { cookieName } from "../src/config";

export default async function sendRequest(
  method: string,
  urlPostfix: string,
  data: any,
  token: string = null
) {
  let config;
  if (method === "post") {
    config = {
      method: method,
      url: process.env.SERVER_URL + urlPostfix,
      data: data,
      headers: {},
    };
  } else if (method === "get") {
    config = {
      method: method,
      url: process.env.SERVER_URL + urlPostfix,
      params: data,
      headers: {},
    };
  }
  if (token) config.headers = { Cookie: `${cookieName}=${token}` };
  return await axios(config);
}
