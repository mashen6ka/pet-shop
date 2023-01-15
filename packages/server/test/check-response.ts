import { expect } from "@jest/globals";

export default function checkResponse(responseData: any, data: any = null) {
  if (data !== null) {
    const dataProcessed = JSON.parse(JSON.stringify(data));
    expect(responseData).toStrictEqual({ success: true, data: dataProcessed });
  } else {
    expect(responseData).toStrictEqual({ success: true });
  }
}
