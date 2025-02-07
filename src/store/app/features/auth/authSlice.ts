import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../store";
import { TUserData } from "../../../../types/auth.Types";

type TAuth = {
  user: null | TUserData;
  token: null | string;
};

const initialState: TAuth = {
  user: null,
  token: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    }
  }
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;

export const useCurrentToken = (state: RootState) => state.auth.token;
export const useCurrentUser = (state: RootState) => state.auth.user;
