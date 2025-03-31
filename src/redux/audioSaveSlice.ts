// src/redux/audioSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AudioState {
  recordTime: string;
  recordingPath: string;
  showMessage: boolean;
}

const initialState: AudioState = {
  recordTime: '00:00',
  recordingPath: '',
  showMessage:false
};

const audioSaveSlice = createSlice({
  name: 'audio',
  initialState,
  reducers: {
    setRecordTime: (state, action: PayloadAction<string>) => {
      state.recordTime = action.payload;
    },
    setRecordingPath: (state, action: PayloadAction<string>) => {
      state.recordingPath = action.payload;
    },
    setShowMessage: (state, action: PayloadAction<boolean>) => {
      state.showMessage = action.payload;
    },
    resetAudioState: () => initialState,
  },
});

export const { setRecordTime, setRecordingPath, resetAudioState, setShowMessage } = audioSaveSlice.actions;

export default audioSaveSlice.reducer;
