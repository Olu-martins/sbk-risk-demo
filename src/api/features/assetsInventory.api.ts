import { baseQuery } from "@api/RTK.base";
import { createApi } from "@reduxjs/toolkit/query/react";
import { ResponseResult, AssetsInventoryKeys, AssetsInventoryQuestionDto, IAssetsInventory } from "+types";

export const assetsApi = createApi({
  reducerPath: "assetsApi",
  baseQuery: baseQuery,
  tagTypes: ["assets", "assetsQuestions"],
  endpoints: (build) => ({
    getAssets: build.query<ResponseResult<IAssetsInventory>, void>({
      query: () => `/assets`,
      providesTags: (result) => (result ? [{ type: "assets" }] : []),
    }),
    getAssetsQuestions: build.query<ResponseResult<AssetsInventoryQuestionDto[]>, void>({
      query: () => `/assets/questions`,
      providesTags: (result) => (result ? [{ type: "assetsQuestions", id: "LIST" }] : []),
    }),
    createAssets: build.mutation<ResponseResult<string>, { context: AssetsInventoryKeys }>({
      query(body) {
        return {
          url: `/assets`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: (_result, _error) => [{ type: "assets" }],
    }),
    updateAssets: build.mutation<ResponseResult<string>, { context: AssetsInventoryKeys }>({
      query(body) {
        return {
          url: `/assets`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: (_result, _error) => [{ type: "assets" }],
    }),
  }),
});

export const {
  useGetAssetsQuery,
  useGetAssetsQuestionsQuery,
  useCreateAssetsMutation,
  useUpdateAssetsMutation,
} = assetsApi;
