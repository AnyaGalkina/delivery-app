import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type AppStatusType = 'idle' | 'loading';
export type Nullable<T> = T | null;

export const initialState = {
  appStatus: 'idle' as AppStatusType,
  appError: null as Nullable<string>,
};

const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppStatus(state, action: PayloadAction<{ appStatus: AppStatusType }>) {
      state.appStatus = action.payload.appStatus;
    },
    setAppError(state, action: PayloadAction<{ appError: Nullable<string> }>) {
      state.appError = action.payload.appError;
    },
  },
});

export const appReducer = slice.reducer;
export const { setAppError, setAppStatus } = slice.actions;
