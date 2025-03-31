import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import log from "@services/log";
import jwtDecode from "jwt-decode";

/**
 * Redux Slice for user
 * This slice manages the decode user in the Redux store.
*/

// initial state
const initialState:any = {
  userInfos:null,
  isLoading:false,
  isSuccess:false,
  isError:false,
}
// User
export const user = createAsyncThunk('userInfo', async(params:any, thunkApi)=>{
  // decode user data
  try {
    const decoded:any = jwtDecode(params?params:'');
    // Parse the userconfig JSON string
        const userconfig = JSON.parse(decoded?.userconfig);
        const decodedData = {
            ...decoded,
            userconfig:userconfig
        }
      return decodedData;
  } catch (error) {
    log.error(error, 'error from user slice')
    return thunkApi.rejectWithValue(error)
  }
})


const userInformationSlice = createSlice({
  name: "userInformation",
  initialState,
  reducers: {},
  extraReducers(builder) {
    //user case
    builder.addCase(user.pending, (state)=>{
      state.isLoading = true
    })
    builder.addCase(user.fulfilled, (state, action)=>{
      state.isLoading = false;
      state.isSuccess = true;
      state.userInfos = action.payload;
    })
    builder.addCase(user.rejected,(state)=>{
      state.isLoading=false;
      state.isError =true;
    })
  },
});


export default userInformationSlice.reducer;
