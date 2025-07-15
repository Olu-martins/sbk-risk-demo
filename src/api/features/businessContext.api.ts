// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { baseQuery } from "@api/RTK.base";
import {
  ResponseResult,
  BusinessContextKeys,
  BusinessContextQuestionDto,
  IBusinessContext,
} from "+types";
import { createApi } from "@reduxjs/toolkit/query/react";

export const businessContextApi = createApi({
  reducerPath: "businessContextApi",
  baseQuery: baseQuery,
  tagTypes: ["businessContext", "businessContextQuestions"],
  endpoints: (build) => ({
    getBusinessContext: build.query<ResponseResult<IBusinessContext>, void>({
      query: () => {
        return `/business-context`;
      },

      providesTags: (result) => {
        return result ? [{ type: "businessContext" }] : [];
      },
    }),
    getBusinessContextQuestions: build.query<
      ResponseResult<BusinessContextQuestionDto[]>,
      void
    >({
      query: () => {
        return `/business-context/questions`;
      },

      providesTags: (result) => {
        return result ? [{ type: "businessContextQuestions", id: "LIST" }] : [];
      },
    }),
    createBusinessContext: build.mutation<
      ResponseResult<string>,
      { context: BusinessContextKeys }
    >({
      query(body) {
        return {
          url: `/business-context`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: () => [{ type: "businessContext" }],
    }),
    updateBusinessContext: build.mutation<
      ResponseResult<string>,
      { context: BusinessContextKeys }
    >({
      query(body) {
        return {
          url: `/business-context`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: () => [{ type: "businessContext" }],
    }),
    deleteBusinessContext: build.mutation<ResponseResult<unknown>, void>({
      query() {
        return {
          url: `/business-context`,
          method: "DELETE",
        };
      },
      invalidatesTags: () => [{ type: "businessContext" }],
    }),
  }),
});

export const {
  useGetBusinessContextQuery,
  useGetBusinessContextQuestionsQuery,
  useCreateBusinessContextMutation,
  useUpdateBusinessContextMutation,
  useDeleteBusinessContextMutation,
} = businessContextApi;
