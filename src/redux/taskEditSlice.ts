import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import log from "@services/log";
import TaskListService from "@services/taskList.service";
import { IInitialState, ISaveRequest, IUserTask } from "@interfaces/editTasks";
import { handle401Error } from "@utils/helpers/errorHandler";
import { RootReducer } from "./store";
import { logErrorToApi } from "@services/ErrorBoundry";
/**
 * Redux Slice for taskEdit
 * This slice manages the user taskList in the Redux store.
 */

// initial state
const initialState:IInitialState = {
  taskEditData:null,
  editData:null,
  isLoading:false,
  isSuccess:false,
  isError:false,
}

// get taskGetById
export const  taskGetById = createAsyncThunk('getTaskEdit', async(params:IUserTask, thunkApi)=>{
  // Get the current state
  const { getState } = thunkApi;
  const state = getState() as RootReducer;
  const userInfos = state.userInformation.userInfos;
  
  // call  getTaskEdit api
  
  try {
    const response = await  TaskListService.taskById(params)
      return response;
  } catch (error:any) {
    logErrorToApi(error , error ,userInfos, "taskById Api")
    log.error(error, 'error from taskEdit slice')
    return await handle401Error(error, thunkApi);
  }
})

// edit task
export const  editTasks = createAsyncThunk('editTasks', async(params:ISaveRequest, thunkApi)=>{
   // Get the current state
   const { getState } = thunkApi;
   const state = getState() as RootReducer;
   const userInfos = state.userInformation.userInfos;

  // call  EditTasks api
  
  try {
    const response = await  TaskListService.editTask(params)
      return response;
  } catch (error:any) {
    logErrorToApi(error , error ,userInfos, "editTask Api")
    log.error(error, 'error from Edit slice')
    return await handle401Error(error, thunkApi);
  }
})

// saveTaskTime task
export const  saveTaskTime = createAsyncThunk('saveTaskTime', async(params:ISaveRequest, thunkApi)=>{
  // Get the current state
  const { getState } = thunkApi;
  const state = getState() as RootReducer;
  const userInfos = state.userInformation.userInfos;
  // call  saveTaskTime api
  
  try {
    const response = await  TaskListService.saveTaskTime(params)
      return response;
  } catch (error:any) {
    logErrorToApi(error , error ,userInfos, "saveTaskTime Api")
    log.error(error, 'error from save time slice')
    return await handle401Error(error, thunkApi);
  }
})
// saveTaskEstimateTime  task
export const  saveTaskEstimateTime = createAsyncThunk('saveTaskEstimateTime', async(params:ISaveRequest, thunkApi)=>{
   // Get the current state
   const { getState } = thunkApi;
   const state = getState() as RootReducer;
   const userInfos = state.userInformation.userInfos;
  // call  saveTaskEstimateTime api
  
  try {
    const response = await  TaskListService.saveTaskEstimateTime(params)
      return response;
  } catch (error:any) {
    logErrorToApi(error , error ,userInfos, "saveTaskEstimateTime Api")
    log.error(error, 'error from save estimate slice')
    return await handle401Error(error, thunkApi);
  }
})


const taskEditSlice = createSlice({
  name: "taskEdit",
  initialState,
  reducers: {},
  extraReducers(builder) {

    //taskEdit case
    builder.addCase(taskGetById.pending, (state)=>{
      state.isLoading = true
    })
    builder.addCase(taskGetById.fulfilled, (state, action)=>{
      state.isLoading = false;
      state.isSuccess = true;
      state.taskEditData = action.payload;
    })
    builder.addCase(taskGetById.rejected,(state)=>{
      state.isLoading=false;
      state.isError =true;
    })


    //edit case
    builder.addCase(editTasks.pending, (state)=>{
      // state.isLoading = true
    })
    builder.addCase(editTasks.fulfilled, (state, action)=>{
      // state.isLoading = false;
      state.isSuccess = true;
      state.editData = action.payload;
    })
    builder.addCase(editTasks.rejected,(state)=>{
      // state.isLoading=false;
      state.isError =true;
    })
  }
});
export default taskEditSlice.reducer;
