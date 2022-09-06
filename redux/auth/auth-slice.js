import { createSlice } from "@reduxjs/toolkit";

import { signIn, signUp, logOut, current } from "./auth-operation";

const initialState = {
  userData: {},
  loading: false,
  error: null,
  isLogin: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // reducers for auth state change control
    setUser: (state, { payload }) => ({
      ...state,
      loading: false,
      isLogin: payload.isLogin,
      userData: {
        ...payload,
      },
    }),
    setStatus: (state, { payload }) => ({
      ...state,
      loading: false,
      isLogin: payload,
    }),
  },
  extraReducers: {
    //* реєстрація нового юзера

    [signUp.pending]: (store, _) => ({ ...store, loading: true, error: null }),
    [signUp.fulfilled]: (store, { payload }) => ({
      ...store,
      loading: false,
      isLogin: true,
      userData: { ...payload },
    }),
    [signUp.rejected]: (store, { payload }) => ({
      ...store,
      loading: false,
      error: payload,
    }),

    // * логін юзера
    [signIn.pending]: (store, _) => ({ ...store, loading: true, error: null }),
    [signIn.fulfilled]: (store, { payload }) => ({
      ...store,
      loading: false,
      isLogin: true,
      userData: {
        ...payload,
      },
    }),

    [signIn.rejected]: (store, { payload }) => ({
      ...store,
      loading: false,
      error: payload,
    }),

    // * current user
    // [current.pending]: (store, _) => ({ ...store, loading: true, error: null }),
    // [current.fulfilled]: (store, { payload }) => ({
    //   ...store,
    //   loading: false,
    //   isLogin: payload.isLogin,
    //   userData: {
    //     ...payload,
    //   },
    // }),

    // [current.rejected]: (store, { payload }) => ({
    //   ...store,
    //   loading: false,
    //   error: payload,
    // }),

    //* розлогінення користувача
    [logOut.pending]: (store, _) => ({ ...store, loading: true, error: null }),
    [logOut.fulfilled]: () => ({ ...initialState, loading: false }),
    [logOut.rejected]: () => ({ ...initialState, loading: false }),
  },
});

export const { setUser, setStatus } = authSlice.actions;

export default authSlice.reducer;
