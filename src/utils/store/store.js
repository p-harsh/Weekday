import { configureStore } from "@reduxjs/toolkit";

import filtersReducer from "../store/Features/Filters/filtersSlice";

export const store = configureStore({
  reducer: {
    filters: filtersReducer,
  },
});
