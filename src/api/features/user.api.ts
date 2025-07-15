// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { baseQuery } from "@api/RTK.base";
import { createApi } from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: baseQuery,
  tagTypes: ["users", "roles"],
  endpoints: () => ({}),
});

export const {} = usersApi;
