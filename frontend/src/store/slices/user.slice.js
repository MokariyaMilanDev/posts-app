import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  "username": undefined
};

const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    INIT_USER: (state, { payload }) => {
      state.username = payload.username
      // state = {...payload}
    },
  },
});

export const { INIT_USER } = userSlice.actions;
export default userSlice.reducer;
