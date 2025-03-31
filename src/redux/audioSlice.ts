
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import log from "@services/log";
import { handle401Error } from "@utils/helpers/errorHandler";
import { RootReducer } from "./store";
import { logErrorToApi } from "@services/ErrorBoundry";
import AudioService from "@services/audio.service";
/**
 * Redux Slice for audio
 * This slice manages the user audio in the Redux store.
 */

// initial state
const initialState: any = {
  audioResponse: {},
  audioData:{},
  loading: false,
  isSuccess: false,
  status: false
}

// get sendAudio
export const sendAudio = createAsyncThunk('sendAudio', async (params: any, thunkApi) => {
  // Get the current state
  const { getState } = thunkApi;
  const state = getState() as RootReducer;
  const userInfos = state.userInformation.userInfos;
  // call  send audio api

  try {
    const response = await AudioService.uploadAudio(params.AudioForm,params.token)
    return response;
  } catch (error:any) {
    logErrorToApi(error , error ,userInfos, "sendAudio Api")
    log.error(error, 'error from send audio slice')
    return await handle401Error(error, thunkApi);
  }
})

// get audio
export const audio = createAsyncThunk('audio', async (params: string, thunkApi) => {
  // Get the current state
  const { getState } = thunkApi;
  const state = getState() as RootReducer;
  const userInfos = state.userInformation.userInfos;
  // call audio api

  try {
    const response = await AudioService.getAudio(params)
    return response;
  } catch (error:any) {
    logErrorToApi(error , error ,userInfos, "sendAudio Api")
    log.error(error, 'error from send audio slice')
    return await handle401Error(error, thunkApi);
  }
})


const audioSlice = createSlice({
  name: "audio",
  initialState,
  reducers: {},
  extraReducers(builder) {
    //set audio case
    builder.addCase(sendAudio.pending, (state) => {
      state.loading = true,
      state.audioResponse = null;
    })
    builder.addCase(sendAudio.fulfilled, (state, action) => {
      state.loading = false;
      state.isSuccess = true;
      state.audioResponse = action.payload;
    })
    builder.addCase(sendAudio.rejected, (state) => {
      state.loading = false;
      state.isError = true;
    })

    //audio case
    builder.addCase(audio.pending, (state) => {
      // state.loading = true
    })
    builder.addCase(audio.fulfilled, (state, action) => {
      // state.loading = false;
      state.isSuccess = true;
      state.audioData = action.payload;
    })
    builder.addCase(audio.rejected, (state) => {
      // state.loading = false;
      state.isError = true;
    })
  }
});
export default audioSlice.reducer;