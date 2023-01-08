import { createSlice } from "@reduxjs/toolkit";
import { Advert } from "../../models/api/advert";

const myAdvertsSlice = createSlice({
  name: "myAdverts",
  initialState: {
    myAdverts: [] as Advert[],
  },
  reducers: {
    addAdvert(state, action) {},
    addAdverts(state, action) {},
    deleteAdvert(state, action) {},
    updateAdvert(state, action) {},
  },
});

export const { addAdvert, deleteAdvert, updateAdvert } = myAdvertsSlice.actions;
export default myAdvertsSlice.reducer;
