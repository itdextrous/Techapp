import { ICheckin, IInitialState } from "@interfaces/checkin";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AssetsService from "@services/assets.service";
import CheckinService from "@services/checkin.service";
import log from "@services/log";
import TaskListService from "@services/taskList.service";
import { handle401Error } from "@utils/helpers/errorHandler";
import { RootReducer } from "./store";
import { logErrorToApi } from "@services/ErrorBoundry";
/**
 * Redux Slice for assets
 * This slice manages the user asstes in the Redux store.
 */

// initial state
const initialState:any = {
    assetsList:null,
    assetDetailsData:null,
    isLoading:false,
    isSuccess:false,
    isError:false,
}

// get assetList
export const  assetList = createAsyncThunk('getAssetList', async(params:string, thunkApi)=>{
    // Get the current state
    const { getState } = thunkApi;
    const state = getState() as RootReducer;
    const userInfos = state.userInformation.userInfos;
  // call  getAssetList api
  try {
    const response = await AssetsService.assetsList(params)
      return response;
  } catch (error:any) {
    logErrorToApi(error , error ,userInfos, "assetsList Api")
    log.error(error, 'error from assetList slice')
    return await handle401Error(error, thunkApi);
  }
})

// get assetDetails
export const  assetDetails = createAsyncThunk('getAssetDetails', async(params:string, thunkApi)=>{
   // Get the current state
   const { getState } = thunkApi;
   const state = getState() as RootReducer;
   const userInfos = state.userInformation.userInfos;
  // call  getAssetDetails api
  try {
    const response = await AssetsService.assetsDetail(params)
      return response;
  } catch (error:any) {
    logErrorToApi(error , error ,userInfos, "assetsDetail Api")
    log.error(error, 'error from assetDetails slice')
    return await handle401Error(error, thunkApi);
  }
})

const assetSlice = createSlice({
  name: "assets",
  initialState,
  reducers: {},
  extraReducers(builder) {

    // assetList
    builder.addCase(assetList.pending, (state)=>{
      state.isLoading = true
    })
    builder.addCase(assetList.fulfilled, (state, action)=>{
      state.isLoading = false;
      state.isSuccess = true;
      state.assetsList = action.payload;
    })
    builder.addCase(assetList.rejected,(state)=>{
      state.isLoading=false;
      state.isError =true;
    })
    
    // assetDetails
    builder.addCase(assetDetails.pending, (state)=>{
      state.isLoading = true
    })
    builder.addCase(assetDetails.fulfilled, (state, action)=>{
      state.isLoading = false;
      state.isSuccess = true;
      state.assetDetailsData = action.payload;
    })
    builder.addCase(assetDetails.rejected,(state)=>{
      state.isLoading=false;
      state.isError =true;
    })
  }
});
export default assetSlice.reducer;
