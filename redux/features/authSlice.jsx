import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  value: {
    isAuth: false,
    userName: "",
    authToken: "",
    isSuperAdmin: false,
    isAdmin: false,
    isLeader: false,
    isPartner: false,
  },
};

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: () => {
      return initialState;
    },
    login: (state, action) => {
      return {
        value: action.payload,
      };
    },
  },
});

export const { login, logout } = auth.actions;
export default auth.reducer;
