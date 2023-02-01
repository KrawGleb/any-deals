import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Advert } from "../../../models/api/advert";

const searchSlice = createSlice({
  name: "searchSlice",
  initialState: {
    adverts: [] as Advert[],
  },
  reducers: {
    resetAdverts(state) {
      state.adverts = [];
    },
    addAdverts(state, action: PayloadAction<Advert[]>) {
      state.adverts = [...state.adverts, ...action.payload];
    },
    setAdverts(state, action: PayloadAction<Advert[]>) {
      state.adverts = action.payload;
    },
  },
});

export const { resetAdverts, addAdverts, setAdverts } = searchSlice.actions;
export default searchSlice.reducer;
