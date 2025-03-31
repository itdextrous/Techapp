import { ICheckin, IInitialState } from "@interfaces/checkin";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CheckinService from "@services/checkin.service";
import log from "@services/log";
import { handle401Error } from "@utils/helpers/errorHandler";
import { RootReducer } from "./store";
import { logErrorToApi } from "@services/ErrorBoundry";
/**
 * Redux Slice for checkinList
 * This slice manages the user checkinList in the Redux store.
 */

// initial state
const initialState:IInitialState = {
    checkinData:null,
    checkinStatus:null,
    status:'',
    checkin:null,
    isLoad:false,
    isLoading:false,
    isSuccess:false,
    isError:false,
}

// get checkinList
export const  checkinList = createAsyncThunk('getcheckinList', async(params:string, thunkApi)=>{
  // Get the current state
  const { getState } = thunkApi;
  const state = getState() as RootReducer;
  const userInfos = state.userInformation.userInfos;
  // call  getcheckinList api

  try {
    const response = await CheckinService.checkinList(params)
      return response;
  } catch (error:any) {
    logErrorToApi(error , error ,userInfos, "checkinList Api")
    log.error(error, 'error from checkinList slice')
    return await handle401Error(error, thunkApi);
  }
})

// get checkinStatus
export const  checkinStatus = createAsyncThunk('getcheckinStatus', async(params:string, thunkApi)=>{
   // Get the current state
   const { getState } = thunkApi;
   const state = getState() as RootReducer;
   const userInfos = state.userInformation.userInfos;
  // call  getcheckinList api

  try {
    const response = await CheckinService.checkinStatus(params)
      return response;
  } catch (error:any) {
    logErrorToApi(error , error ,userInfos, "checkinStatus Api")
    log.error(error, 'error from checkinStatus slice')
    return await handle401Error(error, thunkApi);
  }
})

// get checkin
export const  checkin = createAsyncThunk('checkin', async(params:ICheckin, thunkApi)=>{
   // Get the current state
   const { getState } = thunkApi;
   const state = getState() as RootReducer;
   const userInfos = state.userInformation.userInfos;
  // call  checkin api
  try {
    const response = await CheckinService.checkin(params)
      return response;
  } catch (error:any) {
    logErrorToApi(error , error ,userInfos, "checkin Api")
    log.error(error, 'error from checkin slice')
    return await handle401Error(error, thunkApi);
  }
})

const checkinSlice = createSlice({
  name: "checkin",
  initialState,
  reducers: {},
  extraReducers(builder) {

    // checkinList
    builder.addCase(checkinList.pending, (state)=>{
      state.isLoading = true
    })
    builder.addCase(checkinList.fulfilled, (state, action)=>{
      state.isLoading = false;
      state.isSuccess = true;
      state.checkinData = action.payload;
    })
    builder.addCase(checkinList.rejected,(state)=>{
      state.isLoading=false;
      state.isError =true;
    })

    // checkinStatus
    builder.addCase(checkinStatus.pending, (state)=>{
      state.isLoading = true
    })
    builder.addCase(checkinStatus.fulfilled, (state, action)=>{
      state.isLoading = false;
      state.isSuccess = true;
      state.checkinStatus = action.payload;
      state.status = action.payload.data ? "checkin" : "checkout"
    })
    builder.addCase(checkinStatus.rejected,(state)=>{
      state.isLoading=false;
      state.isError =true;
    })

    // checkin
    builder.addCase(checkin.pending, (state)=>{
      state.isLoading = true
    })
    builder.addCase(checkin.fulfilled, (state, action)=>{
      state.isLoading = false;
      state.isSuccess = true;
      state.checkin = action.payload
    })
    builder.addCase(checkin.rejected,(state)=>{
      state.isLoading=false;
      state.isError =true;
    })
  }
});
export default checkinSlice.reducer;
