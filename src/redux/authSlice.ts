import AsyncStorage from "@react-native-async-storage/async-storage";
import { IGoogleLogin, IInitialState, ILogin } from "../interfaces/login";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import log from "@services/log";
import LoginService from "@services/login.service";

/**
 * Redux Slice for Authentication
 * This slice manages the user authentication token in the Redux store.
*/

// initial state
const initialState: IInitialState = {
  userData: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
}
// login
export const login = createAsyncThunk('emailLogin', async (params: ILogin, thunkApi) => {
  // call login api
  try {
    const response = await LoginService.login(params)
    if (response?.data?.token) {
      await AsyncStorage.setItem("auth_token", response.data.token);
    }
    return response;
  } catch (error) {
    log.error(error, 'error from slice')
    return thunkApi.rejectWithValue(error)
  }
})

// googleLogin with google sign in package 
export const googleLogin = createAsyncThunk('googleLogin', async (params: IGoogleLogin, thunkApi) => {
  // call google sign in api
  try {
    const responseLogin = await LoginService.googleLogin(params)
    // Save token in AsyncStorage
    if (responseLogin?.data?.token) {
      await AsyncStorage.setItem("auth_token", responseLogin.data.token);
    }
    return responseLogin;

  } catch (error) {
    log.error(error, 'error from slice')
    return thunkApi.rejectWithValue(error)
  }
})

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    //logout
    logout: (state) => {
      state.userData = null;
      AsyncStorage.removeItem("auth_token");
    }
  },
  extraReducers(builder) {
    //email login case
    builder.addCase(login.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.userData = action.payload;
    })
    builder.addCase(login.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    })

    //googleLogin
    builder.addCase(googleLogin.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(googleLogin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.userData = action.payload;
    })
    builder.addCase(googleLogin.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    })
  },
});


export const { logout } = authSlice.actions;
export default authSlice.reducer;
