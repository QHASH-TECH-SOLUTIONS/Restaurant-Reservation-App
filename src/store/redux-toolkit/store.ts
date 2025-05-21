import {configureStore} from '@reduxjs/toolkit';
import claimsReducer from './reducers/claimSlice';

export const store = configureStore({
  reducer: {
    claims: claimsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
