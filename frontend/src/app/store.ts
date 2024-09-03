import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import salesReducer from '../features/sales/salesSlice';
import userReducer from '../features/users/userSlice';
import expenseReducer from '../features/expenses/expenseSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    sales: salesReducer,
    user: userReducer,
    expense: expenseReducer,
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
