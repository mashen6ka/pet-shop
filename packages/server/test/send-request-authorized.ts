import axios from "axios";
import { cookieName } from "../src/config";

export default async function sendRequestAuthorized(
  method: string,
  urlPostfix: string,
  data: any,
  token: string
) {
  if (method === "post")
    return await axios({
      method: method,
      url: process.env.SERVER_URL + urlPostfix,
      data: data,
      headers: {
        Cookie: `${cookieName}=${token}`,
      },
    });
  else if (method === "get")
    return await axios({
      method: method,
      url: process.env.SERVER_URL + urlPostfix,
      params: data,
      headers: {
        Cookie: `${cookieName}=${token}`,
      },
    });
}
