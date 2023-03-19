import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  headerTab: 0,
  myTab: 0,
} as {
  headerTab: number;
  myTab: number;
};

const tabsSlice = createSlice({
  name: "tabsSlice",
  initialState,
  reducers: {
    setHeaderTab(state, action: PayloadAction<number>) {
      state.headerTab = action.payload;
    },
    setMyTab(state, action: PayloadAction<number>) {
      state.myTab = action.payload;
    },
  },
});

export const { setHeaderTab, setMyTab } = tabsSlice.actions;

export default tabsSlice.reducer;
