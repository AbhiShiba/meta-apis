import axios, { Axios, HeadersDefaults } from "axios";

export type Version = `v${number}`;

export type HeaderOtions = HeadersDefaults["options"];

export abstract class ShibaApiBase {
  protected accessToken: string;
  protected readonly api: Axios;

  constructor(
    access_token: string,
    version: Version,
    headerOptions?: HeaderOtions
  ) {
    this.accessToken = access_token;

    const headers: HeadersDefaults["options"] = {};
    headers["Content-Type"] = "application/json";
    if (headerOptions) {
      for (const key in headerOptions) {
        headers[key] = headerOptions[key];
      }
    }
    headers.Authorization = `Bearer ${access_token}`;

    this.api = axios.create({
      baseURL: `https://graph.facebook.com/${version}`,
      headers,
    });
  }
}
