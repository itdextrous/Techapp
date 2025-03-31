import React, { useCallback, useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import {  AppDispatch, RootReducer } from '@redux/store';
import VoiceRecorder from './VoiceRecorder';
import { useFocusEffect } from '@react-navigation/native';
import SoundPlayer from 'react-native-sound-player';
import { setRecordingPath } from '@redux/audioSaveSlice';
import Toast from 'react-native-toast-message';
import { widthPixel } from '@utils/helpers/customStyles';
import { sendAudio } from '@redux/audioSlice';

type DetailModal = {
  micModalVisible: boolean,
  setMicModalVisible: (item: boolean) => void,
  setShowMessage:any,
  showMessage:boolean
}

const AudioModal: React.FC<DetailModal> = ({
  micModalVisible,
  setMicModalVisible,
  setShowMessage,
  showMessage
}) => {
  const [loading, setLoading] = useState<boolean>(false)
  const { userData } = useSelector((state: RootReducer) => state.auth)
  const { taskEditData } = useSelector((state: RootReducer) => state.taskEdit)
  const { recordingPath } = useSelector((state: RootReducer) => state.audioSaveSlice); 
  const dispatch = useDispatch<AppDispatch>();

  const getDuartion = async () => {
    SoundPlayer.loadUrl(recordingPath);
    const audioInfo = await SoundPlayer.getInfo();
    return audioInfo;
  }
  const showToast = (width: any, text: string | undefined) => {
    Toast.show({
      type: 'customToast',
      text2: text,
      position: 'top',
      props: styles.toastStyle
    });
  };

  useFocusEffect(
    useCallback(() => {
      if (recordingPath!=="") {

        const token = userData?.data?.token;
        const fetchAudioData = async () => {
          try {
            setLoading(true)

            const AudioForm: FormData = new FormData();
            AudioForm.append('audioFile', {
              uri: recordingPath,
              name: 'sound.mp4', // Use the appropriate file name
              type: 'audio/mp4', // Correct MIME type for mp4
            });

            const info = await getDuartion(); // Await duration
            const metadata = JSON.stringify({
              taskId: taskEditData?.data?.tasks.taskId,
              duration: info.duration,
            })
            // Append metadata to the FormData
            AudioForm.append('metadata', metadata);
            const params = {
              AudioForm, token
            }
            // await AudioService.uploadAudio(AudioForm, token)
            await dispatch(sendAudio(params))
            setLoading(false)
            showToast(widthPixel(150), 'recording saved');

            // Here you can use your AudioForm to make an API call
          } catch (error) {
            setLoading(false)
            console.error('Error getting audio duration:', error);
          }
        };

        fetchAudioData();
      }
      // setRecordingPath('')
      dispatch(setRecordingPath(''));

    }, [recordingPath]))

  return (
    <View style={styles.centeredView}>
        <VoiceRecorder
          micModalVisible={micModalVisible} setMicModalVisible={setMicModalVisible}
          setShowMessage={setShowMessage}
          showMessage={showMessage}
        />
        
    </View>
  );
};


export default AudioModal;

