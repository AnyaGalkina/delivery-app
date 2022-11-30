import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-extraneous-dependencies
import thunk from 'redux-thunk';

import { loadState, saveState } from '../common/utils/local-storage';
import { authReducer } from '../features/auth';

import { appReducer } from './app-reducer';

export const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk),
  preloadedState: {
    ...rootReducer,
    // @ts-ignore
    auth: { ...rootReducer.auth, accessToken: loadState() },
  },
});

store.subscribe(() => {
  saveState(store.getState().auth.accessToken);
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
