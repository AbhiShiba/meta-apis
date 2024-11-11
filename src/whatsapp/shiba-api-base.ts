import axios, { Axios, RawAxiosRequestHeaders } from "axios";

export type Version = `v${number}`;

export type HeaderOptions = RawAxiosRequestHeaders;

export type TokenType = "Bearer" | "OAuth";

export abstract class ShibaApiBase {
  protected accessToken: string;
  protected readonly api: Axios;
  protected token_type: TokenType;

  constructor(
    access_token: string,
    version: Version,
    headerOptions: HeaderOptions = {},
    tokenType: TokenType = "Bearer"
  ) {
    this.accessToken = access_token;
    this.token_type = tokenType;

    const headers: HeaderOptions = {
      "Content-Type": "application/json",
      Authorization: `${tokenType} ${access_token}`,
      ...headerOptions,
    };

    if (headerOptions) {
      for (const key in headerOptions) {
        headers[key] = headerOptions[key];
      }
    }
    headers.Authorization = `${tokenType} ${access_token}`;

    this.api = axios.create({
      baseURL: `https://graph.facebook.com/${version}`,
      headers,
    });
  }
}