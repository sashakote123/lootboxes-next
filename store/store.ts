import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import paramsReducer from './launchParamsSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    params: paramsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;