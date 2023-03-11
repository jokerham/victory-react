import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null
};

export const  userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    set: (state, action) => {
      state.userInfo = action.payload;
    },
  },
})

export const { set } = userInfoSlice.actions;

export default userInfoSlice.reducer;