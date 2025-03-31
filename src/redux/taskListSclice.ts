import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import log from "@services/log";
import TaskListService from "@services/taskList.service";
import { IInitialState, ITaskPayload } from "@interfaces/tasks";
import { handle401Error } from "@utils/helpers/errorHandler";
import { RootReducer } from "./store";
import { logErrorToApi } from "@services/ErrorBoundry";
/**
 * Redux Slice for taskList
 * This slice manages the user taskList in the Redux store.
 */

// initial state
const initialState:IInitialState = {
  taskListData:null,
  projectStatus:null,
  statusListData:null,
  isLoading:false,
  isSuccess:false,
  isError:false,
}

// get taskList
export const  taskList = createAsyncThunk('getTaskList', async(params:ITaskPayload, thunkApi)=>{

    // Get the current state
    const { getState } = thunkApi;
    const state = getState() as RootReducer;
    const userInfos = state.userInformation.userInfos;
    
  // call  getTaskList api
  
  try {
    const response = await  TaskListService.taskList(params)
      return response;
  } catch (error:any) {
    logErrorToApi(error , error ,userInfos, "taskList Api")
    log.error(error, 'error from task slice')
    return await handle401Error(error, thunkApi);
  }
})

// get statusList
export const  statusList = createAsyncThunk('getStatusList', async(params:string, thunkApi)=>{
  // Get the current state
  const { getState } = thunkApi;
  const state = getState() as RootReducer;
  const userInfos = state.userInformation.userInfos;

  // call  getStatusList api
  
  try {
    const response = await  TaskListService.statusPriority(params)
      return response;
  } catch (error:any) {
    logErrorToApi(error , error ,userInfos, "statusPriority Api")
    log.error(error, 'error from staus slice')
    return await handle401Error(error, thunkApi);
  }
})

// get project status
export const projectStatus = createAsyncThunk('projectStatus', async(params:string, thunkApi)=>{
  // Get the current state
  const { getState } = thunkApi;
  const state = getState() as RootReducer;
  const userInfos = state.userInformation.userInfos;
// call  projectStatus api

try {
  const response = await  TaskListService.getProjectStatus(params)

    return response;
} catch (error:any) {
  logErrorToApi(error , error ,userInfos, "projectStatus Api")
  log.error(error, 'error from projectStatus slice')
  return await handle401Error(error, thunkApi);
}
})


const taskListSlice = createSlice({
  name: "taskList",
  initialState,
  reducers: {},
  extraReducers(builder) {
    //task List case
    builder.addCase(taskList.pending, (state)=>{
      state.isLoading = true;
      state.isSuccess = false; // Reset success on pending
      state.isError = false; // Reset error on pending
    })
    builder.addCase(taskList.fulfilled, (state, action)=>{
      state.isLoading = false;
      state.isSuccess = true;
      state.taskListData = action.payload;
    })
    builder.addCase(taskList.rejected,(state)=>{
      state.isLoading = false;
        state.isError = true;
        state.taskListData = null; // Clear data on error
    })

    //status List case
    builder.addCase(statusList.pending, (state)=>{
        state.isLoading = true;
        state.isSuccess = false; // Reset success on pending
        state.isError = false; // Reset error on pending
    })
    builder.addCase(statusList.fulfilled, (state, action)=>{
      state.isLoading = false;
      state.isSuccess = true;
      state.statusListData = action.payload;
    })
    builder.addCase(statusList.rejected,(state)=>{
      state.isLoading=false;
      state.isError =true;
      state.statusListData = null; // Clear data on error
    })

    //project status case
    builder.addCase(projectStatus.pending, (state)=>{
      state.isLoading = true
    })
    builder.addCase(projectStatus.fulfilled, (state, action)=>{
      state.isLoading = false;
      state.isSuccess = true;
      state.projectStatus = action.payload;
    })
    builder.addCase(projectStatus.rejected,(state)=>{
      state.isLoading=false;
      state.isError =true;
    })
  }
});
export default taskListSlice.reducer;
