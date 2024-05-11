import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  roles: [],
  no_of_employees: [],
  experience: 0,
  preferred_location: [],
  tech_stack: [],
  min_base_pay: "",
  company_name_query: "",
  location_search: "",
};

export const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    updateFilter: (state, action) => {
      const { key = "", value = initialState?.[key] } = action.payload || {};
      return { ...state, [key]: value };
    },
  },
});

export const { updateFilter } = filtersSlice.actions;

export default filtersSlice.reducer;
