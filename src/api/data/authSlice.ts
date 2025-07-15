import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./types";
import { AuthResult } from "+types";
export const AUTH_USER = "sbk.auth.user";
export const REMEMBER_ME = "sbk.auth.rememberMe";
export const ACCESS_TOKEN = "sbk.auth.accessToken";
export const REFRESH_TOKEN = "sbk.auth.refreshToken";

export interface AuthState {
  user: AuthResult | null;
}

const auth = createSlice({
  name: "auth",

  initialState: {
    user:
      sessionStorage.getItem(AUTH_USER) || localStorage.getItem(AUTH_USER)
        ? JSON.parse(
            sessionStorage.getItem(AUTH_USER) || localStorage.getItem(AUTH_USER) || ""
          )
        : null,
  } as AuthState,

  reducers: {
    setCredentials: (state, action) => {
      const rememberMe = localStorage.getItem(REMEMBER_ME) || false;
      const { user } = action.payload;
      if (rememberMe) {
        localStorage.setItem(AUTH_USER, JSON.stringify(user));
      } else {
        sessionStorage.setItem(AUTH_USER, JSON.stringify(user));
      }
      state.user = user;
    },

    logout: (state) => {
      state.user = null;
      localStorage.clear();
      sessionStorage.clear();
    },
  },
});

export const { setCredentials, logout } = auth.actions;

export const selectCurrentAuthUser = (state: RootState): AuthResult | null => state.auth.user;

export default auth.reducer;
