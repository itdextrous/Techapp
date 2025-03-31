import ClockIconComponent from "@assets/svgImages/clockIcon"
import NotesIconComponent from "@assets/svgImages/notesIcon"
import TimeIconComponent from "@assets/svgImages/timeIcon"
import { Pressable, Text, View } from "react-native"
import styles from "./styles"
import { ISetModal, ISetOption, ITask } from "@interfaces/editTasks"
import React from "react"
import { pixelSizeHorizontal, widthPixel } from "@utils/helpers/customStyles"

type CustomOptionBar = {
    setOptions: (item: ISetOption) => void;
    setOpenModal: (item: string) => void,
    task: ITask | undefined,
    time: ISetModal,
    navigation: any
}
const CustomOptionBar: React.FC<CustomOptionBar> = ({ setOptions, setOpenModal, task, time, navigation }) => {
    return (
        <View style={styles.optionWrapper}>
            {task !== undefined &&
                <React.Fragment>
                    <Pressable style={[styles.options, {
                        width: time?.estimate == 'Est Time' ? widthPixel(110) :
                            (time?.estimate.includes("d") && time?.estimate.includes("h") && time?.estimate.includes("min"))
                                ? widthPixel(120) : widthPixel(105),
                        borderRightWidth: 1.5,
                        justifyContent: 'flex-end',
                        paddingRight: pixelSizeHorizontal(15),
                        marginLeft: time?.estimate == 'Est Time' ? pixelSizeHorizontal(10) :
                            (time?.estimate.includes("min") && !time?.estimate.includes("h") || !time?.estimate.includes("min")) ?
                                time?.estimate.length == 4 ?
                                    pixelSizeHorizontal(0) :
                                    pixelSizeHorizontal(8) :
                                (time?.estimate.includes("d") && time?.estimate.includes("h") && time?.estimate.includes("min"))
                                    ? time?.estimate.length == 10 ?
                                        pixelSizeHorizontal(5) :
                                        time?.estimate.length == 11 ?
                                            pixelSizeHorizontal(10) :
                                            pixelSizeHorizontal(15) :
                                    (time?.estimate.includes("d") && time?.estimate.includes("min")) ?
                                        time?.estimate.length == 7 ?
                                            pixelSizeHorizontal(10) :
                                            pixelSizeHorizontal(15) :
                                        (time?.estimate.includes("h") && time?.estimate.includes("min")) ?
                                            time?.estimate.length == 8 ?
                                                pixelSizeHorizontal(15) :
                                                time?.estimate.length == 7 ?
                                                    pixelSizeHorizontal(10) :
                                                    pixelSizeHorizontal(18) : pixelSizeHorizontal(5),
                    }]}
                        onPress={() => {
                            setOptions({
                                estimate: true,
                                timeSpent: false,
                                notes: false
                            }),
                                setOpenModal('estimate')
                        }}>
                        <TimeIconComponent />
                        <Text style={styles.optionText}>
                            {time?.estimate}
                        </Text>
                    </Pressable>
                    <Pressable style={[styles.options, {
                        borderRightWidth: 1.5,
                        width: widthPixel(135),
                        justifyContent: 'flex-start',
                        marginLeft: pixelSizeHorizontal(10),
                    }]}
                        onPress={() => {
                            setOptions({
                                timeSpent: true,
                                estimate: false,
                                notes: false
                            })
                            setOpenModal('timeSpent')
                        }}>
                        <ClockIconComponent />
                        <Text style={styles.optionText}>
                            {time?.timeSpent}
                        </Text>
                    </Pressable>
                    <Pressable style={[styles.options, {
                        width: widthPixel(70),
                        marginLeft: pixelSizeHorizontal(10),
                        justifyContent: 'flex-start',
                        borderRightWidth: 0
                    }]}
                        onPress={() => {
                            setOptions({
                                notes: true,
                                estimate: false,
                                timeSpent: false
                            })
                            navigation.navigate('Notes')
                        }}>
                        <NotesIconComponent />
                        <Text style={styles.optionText}>Notes</Text>
                    </Pressable>
                </React.Fragment>
            }
        </View>
    )
}

export default CustomOptionBar;