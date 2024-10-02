import { configureStore } from "@reduxjs/toolkit";
import ChatReducer from "./chatSlice/index"

export const store = configureStore({
  reducer: {
    chat: ChatReducer
  },
});
