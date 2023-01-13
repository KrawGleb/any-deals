import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  group: 0,
  goal: 0,
  interest: undefined,
  title: undefined,
  city: undefined,
  country: undefined,
  category: undefined,
} as {
  group: number;
  goal: number | undefined;
  interest: number | undefined;
  title: string | undefined;
  city: string | undefined;
  country: string | undefined;
  category: string | undefined;
};

const filtersSlice = createSlice({
  name: "filtersSlice",
  initialState,
  reducers: {
    setGroupFilter(state, action: PayloadAction<number>) {
      state.group = action.payload;
    },
    setGoalFilter(state, action: PayloadAction<number | undefined>) {
      state.goal = action.payload;
    },
    setInterestFilter(state, action: PayloadAction<number | undefined>) {
      state.interest = action.payload;
    },
    setTitleFilter(state, action: PayloadAction<string | undefined>) {
      state.title = action.payload;
    },
    setCityFilter(state, action: PayloadAction<string | undefined>) {
      state.city = action.payload;
    },
    setCountryFilter(state, action: PayloadAction<string | undefined>) {
      state.country = action.payload;
    },
    setCategoryFilter(state, action: PayloadAction<string | undefined>) {
      state.category = action.payload;
    },
    resetFiltersFilter(state) {
      state = initialState;
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
} = filtersSlice.actions;

export default filtersSlice.reducer;
