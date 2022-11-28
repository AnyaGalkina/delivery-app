import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { setAppError, setAppStatus } from '../../app/app-reducer';

import { authAPI, LogInType, SignUpType } from './authAPI';

const initialState = {
  isSignedUp: false,
  accessToken: '',
  // companyName: '',
  // login: '',
  // email: '',
  // password: '',
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setSignUpData(state, action: PayloadAction<{ isSignedUp: boolean }>) {
      state.isSignedUp = action.payload.isSignedUp;
    },
    setAccessToken(state, action: PayloadAction<{ accessToken: string }>) {
      state.accessToken = action.payload.accessToken;
    },
  },
});

export const authReducer = slice.reducer;
export const { setSignUpData, setAccessToken } = slice.actions;

export const signUp = (params: SignUpType) => async (dispatch: any) => {
  dispatch(setAppStatus({ appStatus: 'loading' }));
  try {
    /*eslint-disable */
    const response = await authAPI.signUp(params);
    dispatch(setSignUpData({ isSignedUp: true }));
    /* eslint-enable */
  } catch (error: any) {
    dispatch(setAppError({ appError: 'Some error occurred' }));
  } finally {
    dispatch(setAppStatus({ appStatus: 'idle' }));
  }
};

export const logIn = (params: LogInType) => async (dispatch: any) => {
  dispatch(setAppStatus({ appStatus: 'loading' }));
  try {
    const response = await authAPI.logIn(params);

    dispatch(setAccessToken({ accessToken: response.data.accessToken }));
  } catch (error: any) {
    dispatch(setAppError({ appError: 'Some error occurred' }));
  } finally {
    dispatch(setAppStatus({ appStatus: 'idle' }));
  }
};
