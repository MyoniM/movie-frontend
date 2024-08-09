import Cookies from 'js-cookie';
import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '../../store';

interface User {
  id: string;
  email: string;
}

interface AuthState {
  user: Partial<User> | null;

  token: string | null;

  isLoading: boolean;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,

  token: null,

  isLoading: true,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const credentials = action.payload;

      state.user = {
        id: credentials.id,
        email: credentials.email,
      };

      state.token = action.payload.token;

      state.isLoading = false;
      state.isAuthenticated = true;

      localStorage.setItem('id', credentials.id);
      localStorage.setItem('email', credentials.email);

      Cookies.set('token', action.payload.token, { secure: true, sameSite: 'strict', expires: 7 });
    },

    logOut: (state) => {
      state.isLoading = false;
      state.isAuthenticated = false;

      localStorage.clear();

      Cookies.remove('token');
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentToken = (state: RootState) => state.auth.token;
export const selectIsLoading = (state: RootState) => state.auth.isLoading;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
