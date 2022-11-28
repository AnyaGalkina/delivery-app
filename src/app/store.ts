import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import { authReducer } from '../features/auth';

import { appReducer } from './app-reducer';

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
