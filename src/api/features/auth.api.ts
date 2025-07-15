import { baseQuery } from "@api/RTK.base";
import {
  AuthResult,
  ForgotPasswordRequest,
  SendOtpRequest,
  LoginRequest,
  RegisterRequest,
  ResetPasswordRequest,
  VerifyOtpRequest,
  ResponseResult,
  RegisterResponse,
  VerifyMfaRequest,
  CompleteMfaRequest,
  MfaResponse,
} from "+types";
import { createApi } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQuery,
  tagTypes: ["auth"],
  endpoints: (build) => ({
    login: build.mutation<ResponseResult<AuthResult | MfaResponse>, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    register: build.mutation<ResponseResult<RegisterResponse>, RegisterRequest>(
      {
        query: (credentials) => ({
          url: "/auth/signup",
          method: "POST",
          body: { ...credentials },
        }),
      }
    ),
    sendOtp: build.mutation<ResponseResult<string>, SendOtpRequest>({
      query: (credentials) => ({
        url: "/auth/send-otp",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    verifyOtp: build.mutation<ResponseResult<string>, VerifyOtpRequest>({
      query: (credentials) => ({
        url: "/auth/verify-otp",
        method: "POST",
        body: { ...credentials },
      }),
    }),

    completeMfa: build.mutation<ResponseResult<AuthResult>, CompleteMfaRequest>({
      query: (credentials) => ({
        url: `/auth/mfa/complete`,
        method: "POST",
        body: { ...credentials },
      }),
    }),

    verifyMfa: build.mutation<ResponseResult<AuthResult>, VerifyMfaRequest>({
      query: (credentials) => ({
        url: "/auth/verify-mfa",
        method: "POST",
        body: { ...credentials },
      }),
    }),

    forgotPassword: build.mutation<ResponseResult<string>, ForgotPasswordRequest>({
      query: (credentials) => ({
        url: "/auth/password-reset",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    resetPassword: build.mutation<ResponseResult<string>, ResetPasswordRequest>({
      query: (credentials) => ({
        url: `/auth/reset-password?token=${credentials.token}`,
        method: "PATCH",
        body: { password: credentials.password },
      }),
    }),

    resendVerificationEmail: build.mutation<AuthResult, ForgotPasswordRequest>({
      query: (credentials) => ({
        url: "/auth/verification/resend-email",
        method: "POST",
        body: { ...credentials },
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useSendOtpMutation,
  useVerifyOtpMutation,
  useForgotPasswordMutation,
  useResendVerificationEmailMutation,
  useResetPasswordMutation,
  useVerifyMfaMutation,
  useCompleteMfaMutation, 
} = authApi;
