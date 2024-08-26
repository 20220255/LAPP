import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import salesReducer from '../features/sales/salesSlice';
// import salesListReducer from '../features/sales/salesSlice'


export const store = configureStore({
  reducer: {
    auth: authReducer,
    // sales: salesSlice.reducer,
    sales: salesReducer,
    // salesList: salesListSlice.reducer
    // salesList: salesListReducer,
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
