import { RawAxiosRequestHeaders } from "axios";
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
