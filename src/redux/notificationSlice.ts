import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import log from "@services/log";
import { handle401Error } from "@utils/helpers/errorHandler";
import { RootReducer } from "./store";
import { logErrorToApi } from "@services/ErrorBoundry";
import NotificaionsService from "@services/notification.service";
import { initialStates } from "@interfaces/notifications";
/**
 * Redux Slice for notification
 * This slice manages the task notification in the Redux store.
 */

// initial state
const initialState:initialStates = {
    notificationData:null,
    isLoading:false,
    isSuccess:false,
    isError:false,
}

// notificationList
export const notificationList = createAsyncThunk('getNotifications', async(params:string, thunkApi)=>{
  // Get the current state
  const { getState } = thunkApi;
  const state = getState() as RootReducer;
  const userInfos = state.userInformation.userInfos;
  // call  notification api
  try {
    const response = await NotificaionsService.getNotifications(params);
      return response;
  } catch (error:any) {
    logErrorToApi(error , error ,userInfos, "getNotification Api")
    log.error(error, 'error from notification slice')
    return await handle401Error(error, thunkApi);
  }
})

const notificationsSlice = createSlice({
  name: "notificationsList",
  initialState,
  reducers: {},
  extraReducers(builder) {
    // notification case
    builder.addCase(notificationList.pending, (state)=>{
      state.isLoading = true
    })
    builder.addCase(notificationList.fulfilled, (state, action)=>{
      state.isLoading = false;
      state.isSuccess = true;
      state.notificationData = action.payload;
    })
    builder.addCase(notificationList.rejected,(state)=>{
      state.isLoading=false;
      state.isError =true;
    })
  }
});
export default notificationsSlice.reducer;
