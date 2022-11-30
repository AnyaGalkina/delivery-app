import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { setAppError, setAppStatus } from '../../app/app-reducer';
// import { STATUS_CODE } from '../../common/enums/statusCodes';

import {
  authAPI,
  CodeConfirmationType,
  LogInType,
  // refreshTokenAPI,
  SignUpType,
} from './authAPI';

const initialState = {
  // isSignedUp: false,
  accessToken: '',
  isAuth: false,
  email: '',
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setEmail(state, action: PayloadAction<{ email: string }>) {
      state.email = action.payload.email;
    },
    // setSignUpData(state, action: PayloadAction<{ isSignedUp: true }>) {
    //   state.isSignedUp = action.payload.isSignedUp;
    // },
    setAccessToken(state, action: PayloadAction<{ accessToken: string }>) {
      state.accessToken = action.payload.accessToken;
    },
    setIsAuth(state, action: PayloadAction<{ isAuth: boolean }>) {
      state.isAuth = action.payload.isAuth;
    },
  },
});

export const authReducer = slice.reducer;
export const { setEmail, setAccessToken, setIsAuth } = slice.actions;

export const signUp = (params: SignUpType) => async (dispatch: any) => {
  dispatch(setAppStatus({ appStatus: 'loading' }));
  const { email, login, password, companyName } = params;

  try {
    dispatch(setEmail({ email }));
    /*eslint-disable */
    const response = await authAPI.signUp({ email, login, password, companyName });

    // if(response.status === STATUS_CODE.SUCCESS_NO_CONTENT) {
    //   dispatch(setSignUpData({isSignedUp: true}))
    // }
    /* eslint-enable */
  } catch (error: any) {
    dispatch(setAppError({ appError: 'Some error occurred' }));
  } finally {
    dispatch(setAppStatus({ appStatus: 'idle' }));
  }
};

export const sendConfirmationCode =
  (params: CodeConfirmationType) => async (dispatch: any) => {
    dispatch(setAppStatus({ appStatus: 'loading' }));
    try {
      /*eslint-disable */
      const response = await authAPI.confirmRegistration(params);
      /* eslint-enable */
    } catch (error: any) {
      dispatch(
        setAppError({
          appError:
            // error.response.message
            // ? error.response.message
            // :
            'Some error occurred',
        }),
      );
    } finally {
      dispatch(setAppStatus({ appStatus: 'idle' }));
    }
  };

export const logIn = (params: LogInType) => async (dispatch: any) => {
  dispatch(setAppStatus({ appStatus: 'loading' }));
  try {
    const response = await authAPI.logIn(params);

    dispatch(setAccessToken({ accessToken: response.data.accessToken }));
    dispatch(setIsAuth({ isAuth: true }));
  } catch (error: any) {
    dispatch(
      setAppError({
        appError: 'Some error occurred',
      }),
    );
  } finally {
    dispatch(setAppStatus({ appStatus: 'idle' }));
  }
};

export const resendConfirmationCode =
  (params: { email: string }) => async (dispatch: any) => {
    dispatch(setAppStatus({ appStatus: 'loading' }));

    try {
      /*eslint-disable */
      const response = await authAPI.resendConfirmationCode(params);
      /* eslint-enable */
    } catch (error: any) {
      dispatch(
        setAppError({
          appError: 'Some error occurred',
        }),
      );
    } finally {
      dispatch(setAppStatus({ appStatus: 'idle' }));
    }
  };
// export const logout = () => (dispatch: any) => {
//   dispatch(setAppStatus({ appStatus: 'loading' }));
//   try {
//     // const response = await authAPI.logout();
//
//     dispatch(setAccessToken({ accessToken: '' }));
//     dispatch(setIsAuth({ isAuth: false }));
//   } catch (error: any) {
//     console.log(error);
//     // dispatch(
//     //     setAppError({
//     //       appError:
//     //       // error.response.data.message
//     //       // ? error.response.data.message
//     //       // :
//     //           'Some error occurred',
//     //     }))}
//   } finally {
//     dispatch(setAppStatus({ appStatus: 'idle' }));
//   }
// };
//
// export const checkAuth = () => async (dispatch: any) => {
//   dispatch(setAppStatus({ appStatus: 'loading' }));
//   try {
//     const response = await refreshTokenAPI.refreshToken();
//
//     dispatch(setAccessToken({ accessToken: response.data.accessToken }));
//     dispatch(setIsAuth({ isAuth: true }));
//   } catch (error: any) {
//     dispatch(
//       setAppError({
//         appError: 'Some error occurred',
//       }),
//     );
//   } finally {
//     dispatch(setAppStatus({ appStatus: 'idle' }));
//   }
// };
