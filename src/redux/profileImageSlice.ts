import { IProfileInitialData, IprofileParams } from "../interfaces/profileImage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import UploadProfileService from "@services/uploadProfile.service";
import log from "@services/log";
import { handle401Error } from "@utils/helpers/errorHandler";
import { RootReducer } from "./store";
import { logErrorToApi } from "@services/ErrorBoundry";
/**
 * Redux Slice for profileImage
 * This slice manages the user profileImage in the Redux store.
 */

// initial state
const initialState:IProfileInitialData = {
  profileData:null,
  isLoading:false,
  isSuccess:false,
  isError:false,
}

// upload profile
export const profileImage = createAsyncThunk('uploadProfileImage', async(params:any, thunkApi)=>{
    // Get the current state
    const { getState } = thunkApi;
    const state = getState() as RootReducer;
    const userInfos = state.userInformation.userInfos;
  // call  uploadProfile api
  
  try {
    const response = await  UploadProfileService.uploadProfile(params.formData, params.token);
      return response;
  } catch (error:any) {
    logErrorToApi(error , error ,userInfos, "uploadProfile Api")
    log.error(error, 'error from slice')
    return await handle401Error(error, thunkApi);
  }
})

const profileImageSlice = createSlice({
  name: "profileImage",
  initialState,
  reducers: {
     //clearProfile
     clearProfile: (state) => {
      state.profileData = null;
    }
  },
  extraReducers(builder) {
    //profileImage case
    builder.addCase(profileImage.pending, (state)=>{
      state.isLoading = true
    })
    builder.addCase(profileImage.fulfilled, (state, action)=>{
      state.isLoading = false;
      state.isSuccess = true;
      state.profileData = action.payload;
    })
    builder.addCase(profileImage.rejected,(state)=>{
      state.isLoading=false;
      state.isError =true;
    })
  }
});
export const { clearProfile } = profileImageSlice.actions;
export default profileImageSlice.reducer;
