import { IInitialState } from "@interfaces/forgotPassword";
import { ICommon } from "@interfaces/login";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ForgotPasswordService from "@services/forgotPassword.service";
import log from "@services/log";


/**
 * Redux Slice for ForgotPassword
 * This slice manages the forgot password in the Redux store.
*/

// initial state
const initialState:IInitialState = {
  forgotResponse:null,
  isLoading:false,
  isSuccess:false,
  isError:false,
}
// ForgotPassword
export const forgotPassword = createAsyncThunk('forgot', async(params:ICommon, thunkApi)=>{
  // call forgot api
  try {
    const response = await ForgotPasswordService.forgotPassword(params)
      return response;
  } catch (error) {
    log.error(error, 'error from forgot slice')
    return thunkApi.rejectWithValue(error)
  }
})


const forgotPasswordSlice = createSlice({
  name: "forgotPassword",
  initialState,
  reducers: {},
  extraReducers(builder) {
    //forgot case
    builder.addCase(forgotPassword.pending, (state)=>{
      state.isLoading = true
    })
    builder.addCase(forgotPassword.fulfilled, (state, action)=>{
      state.isLoading = false;
      state.isSuccess = true;
      state.forgotResponse = action.payload;
    })
    builder.addCase(forgotPassword.rejected,(state)=>{
      state.isLoading=false;
      state.isError =true;
    })
  },
});


export default forgotPasswordSlice.reducer;
