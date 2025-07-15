import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ACCESS_TOKEN } from "./data/authSlice";

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly NODE_MODE: string;
}

declare global {
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

export const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL || "http://localhost:8080",
  prepareHeaders: (headers) => {
    const token =
      sessionStorage.getItem(ACCESS_TOKEN) ||
      localStorage.getItem(ACCESS_TOKEN)!;

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const RTKApi = createApi({
  baseQuery,
  endpoints: () => ({}),
});
