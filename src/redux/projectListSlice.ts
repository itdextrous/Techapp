import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import log from "@services/log";
import ProjectListService from "@services/projectList.service";
import { IInitialState, IProjectList, IProjectRequest } from "@interfaces/projectList";
import { handle401Error } from "@utils/helpers/errorHandler";
import { RootReducer } from "./store";
import { logErrorToApi } from "@services/ErrorBoundry";

// initial state
const initialState:IInitialState = {
  projectListData:null,
  favProjectListData:null,
  projectData:null,
  status:[],
  isLoading:false,
  isSuccess:false,
  isError:false,
}

// get projectList
export const projectList = createAsyncThunk('getProjectList', async(params:IProjectList, thunkApi)=>{
  // Get the current state
  const { getState } = thunkApi;
  const state = getState() as RootReducer;
  const userInfos = state.userInformation.userInfos;
  // call  getProjectList api
  
  try {
    const response = await  ProjectListService.projectList(params)
      return response;
  } catch (error:any) {
    logErrorToApi(error , error ,userInfos, "projectList Api")
    log.error(error, 'error from profile slice')
    return await handle401Error(error, thunkApi);
  }
})

// get favProjectList
export const favProjectList = createAsyncThunk('getFavProjectList', async(params:string, thunkApi)=>{
  // Get the current state
  const { getState } = thunkApi;
  const state = getState() as RootReducer;
  const userInfos = state.userInformation.userInfos;
  // call  getFavProjectList api
  
  try {
    const response = await  ProjectListService.favProjectList(params)
      return response;
  } catch (error:any) {
    logErrorToApi(error , error ,userInfos, "favProjectList Api")
    log.error(error, 'error from favList slice')
    return await handle401Error(error, thunkApi);
  }
})

// post favProject
export const favProject = createAsyncThunk('favProjects', async(params:IProjectRequest, thunkApi)=>{
    // Get the current state
    const { getState } = thunkApi;
    const state = getState() as RootReducer;
    const userInfos = state.userInformation.userInfos;
  // call  favProjects api
  
  try {
    const response = await  ProjectListService.favProject(params)

      return response;
  } catch (error:any) {
    logErrorToApi(error , error ,userInfos, "favProject Api")
    log.error(error, 'error from favProjects slice')
    return await handle401Error(error, thunkApi);
  }
})


const projectListSlice = createSlice({
  name: "projectList",
  initialState,
  reducers: {},
  extraReducers(builder) {
    //project list case
    builder.addCase(projectList.pending, (state)=>{
      state.isLoading = true
    })
    builder.addCase(projectList.fulfilled, (state, action)=>{
      state.isLoading = false;
      state.isSuccess = true;
      state.projectListData = action.payload;
    })
    builder.addCase(projectList.rejected,(state)=>{
      state.isLoading=false;
      state.isError =true;
    })

    //fav project list case
    builder.addCase(favProjectList.pending, (state)=>{
      state.isLoading = true
    })
    builder.addCase(favProjectList.fulfilled, (state, action)=>{
      state.isLoading = false;
      state.isSuccess = true;
      state.favProjectListData = action.payload;
     
    })
    builder.addCase(favProjectList.rejected,(state)=>{
      state.isLoading=false;
      state.isError =true;
    })

    //fav projects case
    builder.addCase(favProject.pending, (state)=>{
      state.isLoading = true
    })
    builder.addCase(favProject.fulfilled, (state, action)=>{
      state.isLoading = false;
      state.isSuccess = true;
      state.projectData = action.payload;
    })
    builder.addCase(favProject.rejected,(state)=>{
      state.isLoading=false;
      state.isError =true;
    })

  }
});
// export const { clearProfile } = projectListSlice.actions;
export default projectListSlice.reducer;
