import { RootReducer } from "@redux/store";
import { fontPixel, heightPixel, pixelSizeHorizontal, pixelSizeVertical, widthPixel } from "@utils/helpers/customStyles";
import React, { useEffect, useState } from "react";
import { Image, Modal, Platform, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import RNFS from 'react-native-fs';
import Slider from '@react-native-community/slider';
import Icons from "@utils/helpers/Icons";
import TrackPlayer, { State, usePlaybackState, useProgress, Event,Capability  } from 'react-native-track-player';
import { useFocusEffect } from "@react-navigation/native";

interface AudioPlayerProps {
  setAudioPlayerVisible: any;
  audioPlayerVisible: boolean;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  audioPlayerVisible,
  setAudioPlayerVisible
}) => {
  const [audioFile, setAudioFile] = useState<string>('');
  const [isCompleted, setIsCompleted] = useState(false); // Track completion state
  const [isFirstCompletion, setIsFirstCompletion] = useState(true); // Flag to check if it's the first time completion
  const { audioData } = useSelector((state: RootReducer) => state.audio);
  const { position, duration } = useProgress(100);
  const playbackState = usePlaybackState() as any;
  // const [isPlayerReady, setIsPlayerReady] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      setAudioFile(audioData.fileData); // Update audio file data
      setupPlayer();  // Pass the callback to setupPlayer

      const trackChangeListener = TrackPlayer.addEventListener(Event.PlaybackTrackChanged, onTrackChange);
      const trackEndListener = TrackPlayer.addEventListener(Event.PlaybackQueueEnded, onTrackEnd);

      return () => {
        trackChangeListener.remove();
        trackEndListener.remove();
      };
    }, [audioData, audioPlayerVisible])
  );// Listen for changes in audioData and modal visibility

  useEffect(() => {
    if (audioPlayerVisible) {
      setIsCompleted(false); // Reset completion state when modal is shown
      TrackPlayer.seekTo(0);  // Reset the playback position to the start
    }
  }, [audioPlayerVisible]);

  useEffect(() => {
    if (playbackState === State.Stopped && !isCompleted && !isFirstCompletion) {
      setIsCompleted(true); // Mark as completed when stopped, but only after the first completion
    }
  }, [playbackState]);

  const onTrackChange = async (data: any) => {
    if (data.track === 'trackId' && data.position >= data.duration) {
      // Handle completion logic here
      setIsCompleted(true);  // Mark as completed
    }
  };

  const onTrackEnd = async () => {

    // Stop and reset player when track ends
    if (isFirstCompletion) {
      // After the first completion, stop the track without restarting it
      setIsFirstCompletion(false);
      await TrackPlayer.stop(); // Stop the track
      setIsCompleted(true); // Mark it as completed
    }
  };

  const setupPlayer = async (content?:string) => {
    try {
      // Clear the previous track
      await TrackPlayer.reset();
      if (!audioFile) {
          return;
      }
      const mimeType = Platform.OS == 'android' ? 'temp_audio.mp3' : 'temp_audio.m4a'
      // Write the base64 audio file to the filesystem
      const path = `${RNFS.CachesDirectoryPath}/${mimeType}`;
      await RNFS.writeFile(path, audioFile, 'base64'); // Convert base64 to file


      // Add track to the player
      await TrackPlayer.add({
        id: 'trackId',
        url: `file://${path}`, // Use the file path
        title: 'Audio Track',
        artist: 'Unknown Artist',
      });

      // Check if the player is already initialized
      const state = await TrackPlayer.getState();

      if (state !== State.None) {

        togglePlayPause()
        return;
      }
      // Check if audioData exists
      if (!audioData || Object.keys(audioData).length === 0) {
        console.warn('No audio data available');
        return;
      }

      // Setup the player
      await TrackPlayer.setupPlayer();
      // Update notification options for Google Play compliance
      TrackPlayer.updateOptions({
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.Stop,
        ],
        notificationCapabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.Stop,
        ],
        compactCapabilities: [Capability.Play, Capability.Pause],
      });

      togglePlayPause()
      // setIsPlayerReady(true); // Mark player as ready
    } catch (error) {
      await TrackPlayer.setupPlayer();

    }
  };

  const togglePlayPause = async () => {
    if (playbackState.state === State.Playing) {
      await TrackPlayer.pause();
      // await TrackPlayer.play();
    } else if (playbackState.state === State.Ended) {
      // await TrackPlayer.seekTo(0); // Restart the track from the beginning
      await TrackPlayer.play();
    } else {
      if (isCompleted) {
        await TrackPlayer.seekTo(0); // Restart the track from the beginning
        await TrackPlayer.play(); // Play from the start
        setIsCompleted(false); // Reset completed state
      } else {
        await TrackPlayer.play();
      }
    }
  };

  const onSliderValueChange = async (value: number) => {
    await TrackPlayer.seekTo(value);
  };

  return (
    <Modal
      transparent={true}
      visible={audioPlayerVisible}
      onRequestClose={() => setAudioPlayerVisible(false)}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={{
              fontSize: fontPixel(18),
              fontFamily: 'NotoSans-SemiBold',
              color: '#000000'
            }}>Audio Player</Text>
            <TouchableOpacity
              style={{
                width: widthPixel(30),
                alignItems: 'center',
                justifyContent: 'center',
                height: heightPixel(50)
              }}
              onPress={() => {
                setAudioFile('')
                setAudioPlayerVisible(false)
              }}>
              <Icons.AntDesign name="close" size={23} color={"#626D8C"} />
            </TouchableOpacity>
          </View>
          <View style={styles.wrapper}>
            <TouchableOpacity onPress={togglePlayPause} style={styles.playPauseButton}>
              <Icons.MaterialCommunityIcons
                name={playbackState.state === State.Playing ? "pause" : "play"}
                size={25}
                color="#6767E6"
              />
            </TouchableOpacity>
            <Text style={styles.timeText}>
              {new Date(position * 1000).toISOString().substring(14, 19)}
            </Text>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={duration}
              value={position}
              onSlidingComplete={onSliderValueChange}
              minimumTrackTintColor="#2407FF"
              maximumTrackTintColor="#8585F2"
              thumbImage={require('@assets/images/slider2.png')}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)'
  },
  container: {
    paddingBottom: pixelSizeVertical(30),
    paddingTop: pixelSizeVertical(10),
    justifyContent: 'center',
    width: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '88%',
    alignSelf: 'center',
    marginBottom: pixelSizeVertical(10)
  },
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    width: '88%',
    alignSelf: 'center',
    flexDirection:'row'
  },
  timeText: {
    fontSize: fontPixel(17),
    marginVertical: pixelSizeVertical(10),
    color: '#000000',
    marginRight: Platform.OS =='android'?undefined :pixelSizeHorizontal(10)
  },
  playPauseButton: {
    // borderRadius: 50,
    // paddingVertical: pixelSizeVertical(-10),
    paddingHorizontal: pixelSizeHorizontal(8 ),
    // backgroundColor: "#6767E6"
  },
  buttonText: {
    color: '#FFF', // White text
  },
  slider: {
    width: Platform.OS == 'android'? '80%':'70%',
    height: 40,
  }
});

export default AudioPlayer;
