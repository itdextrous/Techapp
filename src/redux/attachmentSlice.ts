import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import log from "@services/log";
import TaskListService from "@services/taskList.service";
import { ITaskAttachment } from "@interfaces/editTasks";
import AttachmentService from "@services/attachment.service";
import { IInitialState } from "@interfaces/attachment";
import { handle401Error } from "@utils/helpers/errorHandler";
import encryptParams from "@utils/helpers/encrypter";
import { RootReducer } from "./store";
import { logErrorToApi } from "@services/ErrorBoundry";
/**
 * Redux Slice for attachments
 * This slice manages the user taskList in the Redux store.
 */

// initial state
const initialState: IInitialState = {
  attachmentData: [],
  attachmentList:null,
  deleteList:null,
  isLoad: false,
  isSuccess: false,
  isError: false,
  status: false
}

// get attachments
export const attachments = createAsyncThunk('attachments', async (params: ITaskAttachment[], thunkApi) => {
  // Get the current state
  const { getState } = thunkApi;
  const state = getState() as RootReducer;
  const userInfos = state.userInformation.userInfos;
  // call  attachments api
  try {
    const attachmentRequests = params.map(async (param: ITaskAttachment) => {
      let value = {
        filePath: param.filePath
      }
      const encrypted = encryptParams(value)
      const response = await AttachmentService.attachment(encrypted);

      return { ...response, ...param };
    });

    const resArray = await Promise.all(attachmentRequests);
    return resArray;
  } catch (error:any) {
    logErrorToApi(error , error ,userInfos, "attachment Api")
    log.error(error, 'error from attachment slice')
    return await handle401Error(error, thunkApi);
  }
})

// get attachment List
export const getAttachmentList = createAsyncThunk('getAttachmentList', async (params: string, thunkApi) => {
  // Get the current state
  const { getState } = thunkApi;
  const state = getState() as RootReducer;
  const userInfos = state.userInformation.userInfos;
  // call  getAttachmentList api
  try {
    const response = await AttachmentService.getAttachment(params);
    return response;
  } catch (error:any) {
    logErrorToApi(error , error ,userInfos, "getAttachment Api")
    log.error(error, 'error from attachment list slice')
    return await handle401Error(error, thunkApi);
  }
})
// upload attachments
export const uploadAttachments = createAsyncThunk('uploadAttachments', async (params: any, thunkApi) => {
  // Get the current state
  const { getState } = thunkApi;
  const state = getState() as RootReducer;
  const userInfos = state.userInformation.userInfos;
  // call  uploadAttachments api
  try {
    const response = await AttachmentService.uploadAttachment(params.formData, params.token);
    return response;
  } catch (error:any) {
    logErrorToApi(error , error ,userInfos, "uploadAttachment Api")
    log.error(error, 'error from upload slice')
    return await handle401Error(error, thunkApi);
  }
})

// delete attachment
export const deleteAttachment = createAsyncThunk('deleteAttachment', async (params: ITaskAttachment, thunkApi) => {
  // Get the current state
  const { getState } = thunkApi;
  const state = getState() as RootReducer;
  const userInfos = state.userInformation.userInfos;
  // call  deleteAttachment api
  try {
    const response = await AttachmentService.deleteAttachment(params);
    return response;
  } catch (error:any) {
    logErrorToApi(error , error ,userInfos, "deleteAttachment Api")
    log.error(error, 'error from delete Attachment slice')
    return await handle401Error(error, thunkApi);
  }
})

const attachmentSlice = createSlice({
  name: "attachment",
  initialState,
  reducers: {},
  extraReducers(builder) {
    //attachment case
    builder.addCase(attachments.pending, (state) => {
      state.isLoad = true
    })
    builder.addCase(attachments.fulfilled, (state, action) => {
      state.isLoad = false;
      state.isSuccess = true;
      state.attachmentData = action.payload;
    })
    builder.addCase(attachments.rejected, (state) => {
      state.isLoad = false;
      state.isError = true;
    })

    // attachment List
    builder.addCase(getAttachmentList.pending, (state) => {
      state.isLoad = true
    })
    builder.addCase(getAttachmentList.fulfilled, (state, action) => {
      state.isLoad = false;
      state.isSuccess = true;
      state.attachmentList = action.payload;
    })
    builder.addCase(getAttachmentList.rejected, (state) => {
      state.isLoad = false;
      state.isError = true;
    })

    //uploadAttachment case
    builder.addCase(uploadAttachments.pending, (state) => {
      // state.isLoad = true
      state.status = false
    })
    builder.addCase(uploadAttachments.fulfilled, (state, action) => {
      state.status = true
    })
    builder.addCase(uploadAttachments.rejected, (state) => {

    })
    //deleteAttachment case
    builder.addCase(deleteAttachment.pending, (state) => {
      state.status = false
    })
    builder.addCase(deleteAttachment.fulfilled, (state, action) => {
      state.status = true
    })
    builder.addCase(deleteAttachment.rejected, (state) => {
    })
  }
});
export default attachmentSlice.reducer;