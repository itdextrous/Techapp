import { setRecordingPath, setRecordTime } from '@redux/audioSaveSlice';
import { AppDispatch } from '@redux/store';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';

const audioRecorderPlayer = new AudioRecorderPlayer();

let recordTime = '00:00';
let intervalId: NodeJS.Timeout | null = null;

const startRecording = async (setShowMessage: any, setMicModalVisible: any, dispatch: AppDispatch,) => {
  const path = await audioRecorderPlayer.startRecorder(); // Start recording    

  const startTime = Date.now();
  const maxRecordingTime = 300000; // 5 minute in milliseconds

  // Start the interval to update the timer every second
  intervalId = setInterval(() => {
    const elapsedTime = Date.now() - startTime;

    // Convert elapsed time into minutes and seconds
    const mins = Math.floor((elapsedTime / 60000) % 60);
    const secs = Math.floor((elapsedTime / 1000) % 60);

    // Format time as MM:SS
    recordTime = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    dispatch(setRecordTime(recordTime));
    // setRecordTime(recordTime)
    // Stop recording if elapsed time exceeds the maximum recording time
    if (elapsedTime >= maxRecordingTime) {
      stopRecording(setShowMessage, setMicModalVisible, dispatch); // Stop recording and clear the interval
      // setRecordTime(recordTime)
      dispatch(setRecordTime(recordTime));

      setShowMessage(false)
    }
  }, 1000); // Update every second
};

const stopRecording = async (setShowMessage: any, setMicModalVisible: any, dispatch: AppDispatch,) => {
  const path = await audioRecorderPlayer.stopRecorder(); // Stop the recording
  // setRecordingPath(path);
  dispatch(setRecordingPath(path));
  if (intervalId) {
    clearInterval(intervalId); // Clear the interval
    intervalId = null;
  }
  recordTime = '00:00'; // Reset the timer
  setMicModalVisible(false)
  // setRecordTime(recordTime)
  dispatch(setRecordTime(recordTime));
  setShowMessage(false)
};

const Recorder = {
  startRecording,
  stopRecording,
};

export default Recorder;
