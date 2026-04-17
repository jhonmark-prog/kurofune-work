import { createSlice } from '@reduxjs/toolkit';

export interface User {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
  gender?: string;
  birthday?: string;
  nationality?: string;
  photo?: string;
}

const initialUser: User = {};

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: initialUser,
    isLoggedIn: false,
    rememberLogin: true
  },
  reducers: {
    login: (state, action: {payload: {data: User, isRememberLogin?: boolean}}) => {
      const { data, isRememberLogin = true } = action.payload;
      state.data = data;
      state.rememberLogin = isRememberLogin;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      if(!state.rememberLogin)
          state.data = {};
      state.isLoggedIn = false;
    },
    updateLocalUser: (state, action: {payload: {data: User}}) => {
      state.data = {...state.data, ...action.payload.data};
    },
    forceClearUserData: (state) => {
      state.data = {};
      state.isLoggedIn = false;
      state.rememberLogin = true;
    },
  },
});

export const { login, updateLocalUser, logout, forceClearUserData } = userSlice.actions;

export const selectUserData = (state: any): User => state.user.data;
export const selectUserIsLoggedIn = (state: any): boolean => state.user.isLoggedIn;

export default userSlice.reducer;
