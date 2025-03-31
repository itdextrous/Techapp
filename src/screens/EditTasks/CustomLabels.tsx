import React, { useState } from "react"
import { Image, Platform, Pressable, ScrollView, Text, View } from "react-native"
import CheckLabels from "./CheckLabels"
import { ILabel } from "@interfaces/editTasks"
import styles from "./styles"
import { fontPixel, heightPixel, pixelSizeHorizontal, pixelSizeVertical, widthPixel } from "@utils/helpers/customStyles"
import RecorderIcon from "@assets/svgImages/recorder"
import { requestPermissions } from "@utils/helpers/permissions"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@redux/store"
import RecorderView from "./RecorderView"
import AudioModal from "./AudioModal"
import CustomDropdown from "@screens/Task/CustomDropdown"

type CustomLabels = {
    setSelected: (item: boolean) => void
    selected: boolean
    checked: ILabel[]
    handleCheck: (items: ILabel, index: number) => void

}
const CustomLabels: React.FC<CustomLabels> = ({
    setSelected, selected, checked, handleCheck
}) => {
    const [showMessage, setShowMessage] = useState<boolean>(false);
    const [micModalVisible, setMicModalVisible] = useState<boolean>(false)
    const dispatch = useDispatch<AppDispatch>();

    const permissionHandler = async () => {
        if (!showMessage) {
            const permission = await requestPermissions()
            if (permission) {
                setMicModalVisible(!micModalVisible)
            }
        } else {
            RecorderView.stopRecording(setShowMessage, setMicModalVisible, dispatch)
        }
    }
    return (
        <>
            <AudioModal
                setShowMessage={setShowMessage}
                showMessage={showMessage}
                micModalVisible={micModalVisible}
                setMicModalVisible={setMicModalVisible}
            />
            <View style={{ position: 'absolute' }}>
                <Text style={{ color: '#A0A7B7', marginVertical: pixelSizeVertical(3), fontFamily: 'NotoSans-Regular' }}>Labels</Text>
            </View>

            {selected && (
                <Pressable
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 110
                    }} // Full-screen transparent Pressable
                    onPress={() => setSelected(false)} // Close when clicking outside
                >
                    <Pressable style={styles.customDropdownWrapper} onPress={() => null}>
                        <ScrollView
                            style={{ maxHeight: 250 }}
                            keyboardShouldPersistTaps="always"
                            nestedScrollEnabled={true}
                            scrollEnabled={true}
                            onStartShouldSetResponder={() => true}
                            onStartShouldSetResponderCapture={() => true}
                        >
                            {checked.map((items: ILabel, index: number) => {
                                return (
                                    <View style={styles.checkLableWrapper} key={index}>
                                        <View style={{
                                            width: Platform.OS == 'android' ? '10%' : '25%'
                                        }}>
                                            <CheckLabels
                                                checked={items.selected}
                                                onPress={() => { handleCheck(items, index) }}
                                            />
                                        </View>
                                        <View
                                            onStartShouldSetResponder={() => true}
                                            style={[styles.dropdownText, {
                                                backgroundColor: items.bgColor
                                            }]}>
                                            <Text
                                                style={{ color: 'white', fontFamily: 'NotoSans-Regular' }}>
                                                {items.text.length > 8 ? `${items.text.substring(0, 8)}...` : items.text}
                                            </Text>
                                        </View>
                                    </View>
                                );
                            })}
                        </ScrollView>
                    </Pressable>
                </Pressable>
            )}

            <View style={styles.dropdownView}>
                {checked
                    .filter((item: ILabel) => item.selected)
                    .slice(0, 2).map((items: ILabel, index: number) => {
                        return (
                            items.selected &&
                            <View style={{
                                width: '30%',

                            }} key={index}>
                                <View style={[styles.dropdownViewText, {
                                    backgroundColor: items.bgColor
                                }]}>
                                    <Text
                                        style={{
                                            color: 'white',
                                            fontFamily: 'NotoSans-Regular',
                                            fontSize: fontPixel(16)
                                        }}>{items.text.length > 8 ? `${items.text.substring(0, 8)}...` : items.text}</Text>

                                </View>
                            </View>

                        )
                    })}

                <View style={{ marginHorizontal: pixelSizeHorizontal(3) }}>
                    {checked.filter(item => item.selected).length > 2 && (
                        <CustomDropdown customLabelList={checked} />
                    )}
                </View>
                {checked.length > 0 ?

                    <Pressable style={styles.selectedText}
                        onPress={() => setSelected(!selected)}>
                        <Image source={require('@assets/images/drop-frame.png')} style={{
                            resizeMode: 'contain', width: widthPixel(30), height: heightPixel(40)
                        }} />

                    </Pressable>
                    :
                    <View style={[styles.dropdownViewText, {
                        backgroundColor: 'grey',
                        paddingHorizontal: pixelSizeHorizontal(10)
                    }]}>
                        <Text
                            style={{
                                fontFamily: 'NotoSans-Medium',
                                fontSize: fontPixel(16),
                                color: 'white',
                            }}>No Label</Text>

                    </View>
                }
            </View>

            <View style={{
                alignItems: 'center',
                justifyContent: 'flex-end',
            }}>
                <Pressable
                    onPress={permissionHandler}
                    style={[styles.saveButton, {
                        borderColor: showMessage ? '#FF0707' : '#8585F2',
                    }]}>
                    {showMessage ?
                        <View style={styles.stopButton} />
                        :
                        <RecorderIcon />
                    }
                </Pressable>
            </View>
        </>
    )
}

export default CustomLabels;