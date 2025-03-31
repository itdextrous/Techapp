import { initialStates, IUpdateNoteResponse } from "@interfaces/notes";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import log from "@services/log";
import NotesService from "@services/notes.service";
import { handle401Error } from "@utils/helpers/errorHandler";
import { RootReducer } from "./store";
import { logErrorToApi } from "@services/ErrorBoundry";
/**
 * Redux Slice for notes
 * This slice manages the user profileImage in the Redux store.
 */

// initial state
const initialState:initialStates = {
  notesData:null,
  isLoading:false,
  isSuccess:false,
  isError:false,
}

// notesList notes
export const notesList = createAsyncThunk('getNotes', async(params:string, thunkApi)=>{
  // Get the current state
  const { getState } = thunkApi;
  const state = getState() as RootReducer;
  const userInfos = state.userInformation.userInfos;
  // call  notes api
  try {
    const response = await NotesService.getNotes(params);
      return response;
  } catch (error:any) {
    logErrorToApi(error , error ,userInfos, "getNotes Api")
    log.error(error, 'error from notes slice')
    return await handle401Error(error, thunkApi);
  }
})

// updated notes notes
export const updateNotes = createAsyncThunk('updateNotes', async(params:IUpdateNoteResponse, thunkApi)=>{
  // Get the current state
  const { getState } = thunkApi;
  const state = getState() as RootReducer;
  const userInfos = state.userInformation.userInfos;
  // notes notes api
  try {
    const response = await NotesService.updateNotes(params);
      return response;
  } catch (error:any) {
    logErrorToApi(error , error ,userInfos, "updateNotes Api")
    log.error(error, 'error from updated notes slice')
    return await handle401Error(error, thunkApi);
  }
})

const notesSlice = createSlice({
  name: "notesList",
  initialState,
  reducers: {},
  extraReducers(builder) {
    // notes case
    builder.addCase(notesList.pending, (state)=>{
      state.isLoading = true
    })
    builder.addCase(notesList.fulfilled, (state, action)=>{
      state.isLoading = false;
      state.isSuccess = true;
      state.notesData = action.payload;
    })
    builder.addCase(notesList.rejected,(state)=>{
      state.isLoading=false;
      state.isError =true;
    })
  }
});
export default notesSlice.reducer;
