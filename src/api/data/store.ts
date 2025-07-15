import { RTKApi } from "@api/RTK.base";
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import authReducer from "./authSlice";
import { authApi } from "@api/features/auth.api";
import { businessContextApi } from "@api/features/businessContext.api";
import { assetsApi } from "@api/features/assetsInventory.api";
import { AppDispatch, RootState } from "./types";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [businessContextApi.reducerPath]: businessContextApi.reducer,
    [RTKApi.reducerPath]: RTKApi.reducer,
    [assetsApi.reducerPath]: assetsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      RTKApi.middleware,
      authApi.middleware,
      businessContextApi.middleware,
      assetsApi.middleware
    ),
  devTools: import.meta.env.NODE_MODE !== "production",
});

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;
