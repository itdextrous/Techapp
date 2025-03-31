import { IInitialState, ISendEmail } from "@interfaces/forgotPassword";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ForgotPasswordService from "@services/forgotPassword.service";
import log from "@services/log";


/**
 * Redux Slice for SendEmail
 * This slice manages the send email in the Redux store.
*/

// initial state
const initialState:IInitialState = {
  emailResponse:null,
  isLoading:false,
  isSuccess:false,
  isError:false,
}
// SendEmail
export const sendEmail = createAsyncThunk('email', async(params:ISendEmail, thunkApi)=>{
  // call send email api
  try {
    const response = await ForgotPasswordService.sendEmail(params)
      return response;
  } catch (error) {
    log.error(error, 'error from email slice')
    return thunkApi.rejectWithValue(error)
  }
})


const sendEmailSlice = createSlice({
  name: "sendEmail",
  initialState,
  reducers: {},
  extraReducers(builder) {
    //sent email case
    builder.addCase(sendEmail.pending, (state)=>{
      state.isLoading = true
    })
    builder.addCase(sendEmail.fulfilled, (state, action)=>{
      state.isLoading = false;
      state.isSuccess = true;
      state.emailResponse = action.payload;
    })
    builder.addCase(sendEmail.rejected,(state)=>{
      state.isLoading=false;
      state.isError =true;
    })
  },
});


export default sendEmailSlice.reducer;
