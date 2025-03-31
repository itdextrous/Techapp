import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import log from "@services/log";
import { IInitialState } from "@interfaces/permissions";
import PermissionService from "@services/permissionsService";
/**
 * Redux Slice for permissions
 * This slice manages the permissions in the Redux store.
 */

// initial state
const initialState:IInitialState = {
    userPermissions:null,
    isLoading:false,
    isSuccess:false,
    isError:false,
}

// permission
export const userPermissions = createAsyncThunk('userPermissions', async()=>{

  try {
    const response = await PermissionService.permission();
      return response;
  } catch (error:any) {
    log.error(error, 'error from permission slice')
  }
})

const permissionSlice = createSlice({
  name: "userPermissions",
  initialState,
  reducers: {},
  extraReducers(builder) {
    // notification case
    builder.addCase(userPermissions.pending, (state)=>{
      state.isLoading = true
    })
    builder.addCase(userPermissions.fulfilled, (state, action)=>{
      state.isLoading = false;
      state.isSuccess = true;
      state.userPermissions = action.payload;
    })
    builder.addCase(userPermissions.rejected,(state)=>{
      state.isLoading=false;
      state.isError =true;
    })
  }
});
export default permissionSlice.reducer;
