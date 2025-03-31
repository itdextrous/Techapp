import { fontPixel, heightPixel, pixelSizeHorizontal, pixelSizeVertical, widthPixel } from "@utils/helpers/customStyles"
import { useEffect, useRef, useState } from "react"
import { Animated, Easing, Modal, Pressable, StyleSheet, Text, View } from "react-native"
import RecorderView from "./RecorderView"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootReducer } from "@redux/store"

type VoiceRecorder = {
    setMicModalVisible: (item: boolean) => void,
    micModalVisible: boolean,
    setShowMessage: any,
    showMessage: boolean,
}
const VoiceRecorder: React.FC<VoiceRecorder> = ({
    micModalVisible,
    setMicModalVisible,
    showMessage,
    setShowMessage,
}) => {
    const [count, setCount] = useState<number>(3)
    const [warning, setWarning] = useState<boolean>(false)
    const scaleValue = useRef(new Animated.Value(0)).current;
    const messageScaleValue = useRef(new Animated.Value(0)).current;
    const dispatch = useDispatch<AppDispatch>();

    const { recordTime } = useSelector((state: RootReducer) => state.audioSaveSlice);
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null)

    useEffect(() => {
        setCount(3)
        // setShowMessage(false)
        if (micModalVisible) {
            countdownHandler()
        }
    }, [micModalVisible])
    const countdownHandler = () => {
        let index = count;

        // const intervalId = setInterval(() => {
        const id = setInterval(() => {
            if (index > 0) {
                setCount(index);
                // Animate scale
                Animated.sequence([
                    Animated.timing(scaleValue, {
                        toValue: 0, // Scale to 1.5 (grow)
                        duration: 300,
                        easing: Easing.out(Easing.ease),
                        useNativeDriver: true,
                    }),
                    Animated.timing(scaleValue, {
                        toValue: 1, // Scale back to 1 (shrink)
                        duration: 300,
                        easing: Easing.out(Easing.ease),
                        useNativeDriver: true,
                    }),
                ]).start();
                index--;
            }
            else {
                RecorderView.startRecording(setShowMessage, setMicModalVisible, dispatch);
                // clearInterval(intervalId);
                clearInterval(id);
                setShowMessage(true);
                setTimeout(() => {

                    // Animate scale for "Hello" message
                    Animated.timing(messageScaleValue, {
                        toValue: 1, // Scale to 1 (show)
                        duration: 300,
                        easing: Easing.out(Easing.ease),
                        useNativeDriver: true,
                    }).start();
                }, 1000);
            }
        }, 1000);
        setIntervalId(id);
    };

    const handleClose = () => {
        if (showMessage) {
            setWarning(true);
            setTimeout(() => {
                setWarning(false);
            }, 3000);
        } else {
            if (count == 1) {
                setCount(3)
                setMicModalVisible(!micModalVisible);
                scaleValue.setValue(0);
                messageScaleValue.setValue(0)
                // setShowMessage(false)
            }
        }
    }
    const cancelHandler = () => {
        setCount(3); // Reset the countdown
        setMicModalVisible(false); // Close the modal
        scaleValue.setValue(0); // Reset scale animation

        // Clear the interval if it's running
        if (intervalId) {
            clearInterval(intervalId);
        }
    }
    const recordingStopHandler = () => {
        RecorderView.stopRecording(setShowMessage, setMicModalVisible, dispatch),
            handleClose()
        // setShowMessage(false)
    }
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={micModalVisible}
            onRequestClose={handleClose}
        >

            <Pressable style={[styles.overlay, {
                justifyContent: showMessage && warning ? 'space-between' : 'flex-end',
                backgroundColor: 'rgba(0,0,0,0.3)'
            }]}
                onPress={handleClose}
            >
                {showMessage && warning &&
                    <View style={{
                        borderWidth:1,
                        marginTop: pixelSizeVertical(70),
                        width: widthPixel(350),
                        borderColor: '#909CBA',
                        backgroundColor: '#FFFFFF',
                        alignSelf: 'center',
                        borderRadius: 5,
                        paddingHorizontal: pixelSizeHorizontal(10),
                        paddingVertical: pixelSizeVertical(5),
                    }}>
                        <Text style={{
                            fontSize: fontPixel(16),
                            fontFamily: 'NotoSans-regular',
                            color: '#000000',
                            lineHeight: 30
                        }}>Audio recording is in progress.Please Stop the recording before exiting.
                        </Text>
                    </View>
                }
                <View style={styles.modalContainer}>
                    {showMessage ?
                        <View style={[styles.modalWrapper,
                        ]}>
                            <View
                                style={styles.customToggle} />
                            <View style={[styles.countdownWrapper, {
                                justifyContent: 'center'
                            }]}>
                                <Text style={styles.progressText}>Audio recording in progress</Text>
                            </View>
                            <View style={styles.recordProcessWrapper}>
                                <Pressable
                                    onPress={recordingStopHandler}
                                    style={styles.stopRecordingView}>
                                    <View
                                        style={{
                                            width: widthPixel(15),
                                            height: heightPixel(15),
                                            backgroundColor: '#FF0707',
                                            borderRadius: 3,
                                        }} />
                                </Pressable>
                                <View style={styles.recordTimeView}>
                                    <Text style={styles.recordingText}>{recordTime}</Text>
                                </View>
                            </View>
                        </View>
                        :
                        <View style={[styles.modalWrapper
                        ]}>
                            <View
                                style={styles.customToggle} />
                            <Animated.View style={[{ transform: [{ scale: scaleValue }] }, styles.countdownWrapper]}>
                                <Text style={[styles.countdown]}>{count}</Text>
                            </Animated.View>
                            <Text style={{
                                fontSize: fontPixel(16),

                            }}>recording will start in {count} seconds</Text>

                            <Pressable onPress={cancelHandler} style={styles.cancelButton}>
                                <Text style={styles.cancelButtonText}>Cancel</Text>
                            </Pressable>


                        </View>
                    }
                </View>
            </Pressable>
        </Modal>
    )
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        width: '100%',
    },
    modalWrapper: {
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        height: '100%',
        borderTopEndRadius: 15,
        borderTopStartRadius: 15,
    },
    countdownWrapper: {
        alignItems: 'center',
        marginTop: pixelSizeVertical(20),
        height: '55%'
    },
    countdown: {
        fontSize: fontPixel(90),
        color: '#8585F2',
        fontFamily: 'NotoSans-medium'
    },
    progressText: {
        fontSize: fontPixel(24),
        color: 'rgba(0,0,0,1)',
        fontFamily: 'NotoSans-medium'
    },
    customToggle: {
        width: widthPixel(40),
        borderRadius: 30,
        height: heightPixel(4),
        backgroundColor: 'rgba(160, 167, 183, 1)',
        position: 'absolute',
        top: 10
    },
    modalContainer: {
        width: '100%',
        height: heightPixel(240),

    },
    recordProcessWrapper: {
        // borderWidth:1,
        width: '85%',
        alignItems: 'center',
        justifyContent: 'flex-end',
        flexDirection: 'row',
    },
    stopRecordingView: {
        borderWidth: 1,
        paddingVertical: pixelSizeVertical(10),
        borderRadius: 50,
        borderColor: '#FF0707',
        paddingHorizontal: pixelSizeHorizontal(10),
        marginHorizontal: pixelSizeHorizontal(20)
    },
    recordTimeView: {
        borderWidth: 1,
        backgroundColor: '#000000',
        height: heightPixel(46),
        width: widthPixel(70),
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    recordingText: {
        color: "#FFFFFF",
        fontSize: fontPixel(22),
        fontFamily: 'NotoSans-regular'
    },
    cancelButton: {
        borderWidth: 1,
        borderColor: '#8585F2',
        borderRadius: 5,
        paddingHorizontal: 15,
        paddingVertical: 4,
        marginTop: 15
    },
    cancelButtonText: {
        color: '#8585F2',
        fontSize: fontPixel(18),
    }
})
export default VoiceRecorder;