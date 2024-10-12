import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import dashboardSlice from "./slices/dashboardSlice";

export const store = configureStore({
  reducer: {
    userSlice : userSlice,
    dashboardSlice: dashboardSlice
  },
});

