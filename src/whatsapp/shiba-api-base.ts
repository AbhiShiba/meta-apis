import axios, { Axios, RawAxiosRequestHeaders } from "axios";

/**
 * Represents the version of the API.
 * The version should follow the format `v<number>`, e.g., `v1`, `v2`.
 */
export type Version = `v${number}`;

/**
 * Represents the structure of custom HTTP headers.
 * It extends the RawAxiosRequestHeaders type from Axios.
 */
export type HeaderOptions = RawAxiosRequestHeaders;

/**
 * Defines the type of authorization token to be used.
 * - `Bearer`: Standard Bearer token.
 * - `OAuth`: OAuth token.
 */
export type TokenType = "Bearer" | "OAuth";

/**
 * Base class for interacting with the Shiba API.
 * Handles authentication and sets up an Axios instance with the provided configuration.
 */

export abstract class ShibaApiBase {
  /**
   * The access token used for API authentication.
   */
  protected accessToken: string;

  /**
   * The Axios instance configured with the API's base URL and headers.
   */
  protected readonly api: Axios;

  /**
   * The type of token used for authentication, either 'Bearer' or 'OAuth'.
   */
  protected token_type: TokenType;

  /**
   * Creates an instance of ShibaApiBase.
   * 
   * @param access_token - The access token used for authentication.
   * @param version - The API version, formatted as 'v<number>'.
   * @param headerOptions - Optional custom headers to include in the request.
   * @param tokenType - The token type for authorization. Defaults to 'Bearer'.
   */
  constructor(
    access_token: string,
    version: Version,
    headerOptions: HeaderOptions = {},
    tokenType: TokenType = "Bearer"
  ) {
    this.accessToken = access_token;
    this.token_type = tokenType;

    // Setting up default headers with content type and authorization token
    const headers: HeaderOptions = {
      "Content-Type": "application/json",
      Authorization: `${tokenType} ${access_token}`,
      ...headerOptions,
    };

    // Creating the Axios instance with the configured base URL and headers
    this.api = axios.create({
      baseURL: `https://graph.facebook.com/${version}`,
      headers,
    });
  }
}