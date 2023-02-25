import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  group: 0,
  goal: 0,
  interest: undefined,
  title: undefined,
  city: undefined,
  country: undefined,
  category: undefined,
  pageSize: 1,
  page: 1,
} as {
  group: number;
  goal: number | undefined;
  interest: number | undefined;
  title: string | undefined;
  city: string | undefined;
  country: string | undefined;
  category: string | undefined;
  pageSize: number;
  page: number;
};

const filtersSlice = createSlice({
  name: "filtersSlice",
  initialState,
  reducers: {
    setGroupFilter(state, action: PayloadAction<number>) {
      state.group = action.payload;
      state.page = 1;
    },
    setGoalFilter(state, action: PayloadAction<number | undefined>) {
      state.goal = action.payload;
      state.page = 1;
    },
    setInterestFilter(state, action: PayloadAction<number | undefined>) {
      state.interest = action.payload;
      state.page = 1;
    },
    setTitleFilter(state, action: PayloadAction<string | undefined>) {
      state.title = action.payload;
      state.page = 1;
    },
    setCityFilter(state, action: PayloadAction<string | undefined>) {
      state.city = action.payload;
      state.page = 1;
    },
    setCountryFilter(state, action: PayloadAction<string | undefined>) {
      state.country = action.payload;
      state.page = 1;
    },
    setCategoryFilter(state, action: PayloadAction<string | undefined>) {
      state.category = action.payload;
      state.page = 1;
    },
    setPageFilter(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    resetFilters(state) {
      state.group = initialState.group;
      state.goal = initialState.goal;
      state.interest = initialState.interest;
      state.title = initialState.title;
      state.city = initialState.city;
      state.country = initialState.country;
      state.category = initialState.category;
      state.pageSize = initialState.pageSize;
      state.page = initialState.page;
    },
  },
});

export const {
  setCategoryFilter,
  setCityFilter,
  setCountryFilter,
  setGoalFilter,
  setGroupFilter,
  setInterestFilter,
  setTitleFilter,
  setPageFilter,
  resetFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;
