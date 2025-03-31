
// src/utils/errorHandler.ts

import { AppDispatch } from '@redux/store';
import { logout } from '@redux/authSlice'; // Adjust the import paths as needed
import { clearProfile } from '@redux/profileImageSlice';
import { googleSignout } from '@utils/config/googleSignin';

export const handle401Error = async (error: any, thunkApi: any) => {
  const dispatch: AppDispatch = thunkApi.dispatch;

  if (error.response && error.response.status === 401) {
    dispatch(logout());
    dispatch(clearProfile());
    await googleSignout();
  }
  
  return thunkApi.rejectWithValue(error);
}
