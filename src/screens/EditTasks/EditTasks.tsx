import DashboardHeader from "@components/layouts/DashboardHeader";
import { useCallback, useEffect, useRef, useState, useMemo } from "react";
import { BackHandler, Pressable, RefreshControl, ScrollView, Text, TouchableWithoutFeedback, View, useWindowDimensions } from "react-native"
import tw from 'twrnc';
import DetailesLayout from "./AccordianLayout";
import DetailModal from "./detailModal";
import styles from "./styles";
import BackIconComponent from "@assets/svgImages/backIcon";
import CustomOptionBar from "./CustomOptionBar";
import LabelsView from "./LabelsView";
import SetTimeModal from "./SetTimeModal";
import RenderHtml from 'react-native-render-html';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootReducer } from "@redux/store";
import { ISetModal, ISetOption, ITaskAttachment, IUserTask } from "@interfaces/editTasks";
import Loader from "@components/common/Loader";
import { attachments, getAttachmentList } from "@redux/attachmentSlice";
import getTime from "@utils/helpers/datetime";
import common from "@utils/helpers/commonFunction";
import { editTasks, taskGetById } from "@redux/taskEditSlice";
import encryptParams from "@utils/helpers/encrypter";
import { colors, widthPixel } from "@utils/helpers/customStyles";
import { useFocusEffect } from "@react-navigation/native";
import TitleModal from "./EditTitleModal";
import React from "react";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";

const EditTasks = ({ navigation, route }: any) => {
    const { width } = useWindowDimensions();
    const { taskEditData, isLoading } = useSelector((state: RootReducer) => state.taskEdit);
    const { status } = useSelector((state: RootReducer) => state.attachment);
    const { userInfos } = useSelector((state: RootReducer) => state.userInformation);
    const [detailText, setDetailText] = useState<string | undefined>(undefined)
    const [modalVisible, setModalVisible] = useState<boolean>(false)
    const [title, setTitle] = useState<string | undefined>(undefined)
    const [selected, setSelected] = useState<boolean>(false)
    const [tasks, setTasks] = useState<any>(null)
    const [refreshing, setRefreshing] = useState(false);
    const [titleModalVisible, setTitleModalVisible] = useState(false);
    const [Edittasks, setEditTasks] = useState<any>([])
    const [options, setOptions] = useState<ISetOption>({
        estimate: false,
        timeSpent: false,
        notes: false
    })
    const [time, setTime] = useState<ISetModal>({
        estimate: 'Est Time',
        timeSpent: 'Time Spent',
    })
    const [openModal, setOpenModal] = useState<string>('')
    const [open, setOpen] = useState<boolean>(true);
    const dispatch = useDispatch<AppDispatch>();

    const fromRef = useRef(route.params?.from);
    const getTask = route?.params?.task;


    useEffect(() => {
        fromRef.current = route.params?.from;
    }, [route]);

    useEffect(() => {
        setEditTasks(taskEditData)
    }, [taskEditData])

    const taskHandler = useCallback(async () => {
        const payload: IUserTask = {
            userId: userInfos?.id,
            companyId: userInfos?.companyId,
            taskId: getTask?.taskId || getTask?.id,
            taskType: "All"
        }

        const respopnse = await dispatch(taskGetById(payload))
        const allTaskResponse = respopnse.payload.data

        setTasks(allTaskResponse)
        setDetailText(allTaskResponse?.tasks?.taskDescription)
        setTitle(allTaskResponse?.tasks?.taskTitle)
        setTime(prevTime => ({
            ...prevTime,
            estimate: allTaskResponse?.tasks?.estimatedTimeInMinutes ?
                getTime.convertMinutes(allTaskResponse.tasks.estimatedTimeInMinutes) : 'Est Time',
            timeSpent: allTaskResponse?.tasks?.totalTaskTime ?
                getTime.convertMinutes(allTaskResponse.tasks.totalTaskTime) : 'Time Spent',
        }));
    }, [dispatch, getTask, userInfos]);


    useEffect(() => {
        taskHandler()
        getAttachments()
    }, [getTask])

    useEffect(() => {
        getAttachments()
    }, [status])

    const editHandler = () => {
        if (!getTask || !title) return;
        const payload = {
            taskId: getTask?.taskId,
            isInline: true,
            inlineTarget: "taskTitle",
            taskTitle: title
        }
        dispatch(editTasks(payload))
    };

    const getAttachments = useCallback(async () => {
        if (!getTask) return;
        const params = {
            taskId: getTask?.taskId
        }
        let encryptedString = encryptParams(params)
        const response = await dispatch(getAttachmentList(encryptedString))
        const attachmentTasks = response.payload?.data || [];
        dispatch(attachments(attachmentTasks));
    }, [dispatch, getTask]);

    useFocusEffect(
        useCallback(() => {
            const backAction = () => {
                pressBackHandler(fromRef.current);
                return true; // Prevent default behavior (i.e., going back)
            };

            const backHandler = BackHandler.addEventListener(
                "hardwareBackPress",
                backAction
            );

            return () => {
                backHandler.remove(); // Clean up the listener on unmount or when screen loses focus
            };
        }, [])
    );

    const pressBackHandler = (back: string) => {
        setSelected(false)
        if (options.notes) {
            setOptions((prevOption) => ({
                ...prevOption,
                notes: false,
            }));
        } else if (back === 'Notification') {
            navigation.navigate('Projects', {
                screen: 'Notification',
            });
        } else {
            navigation.goBack()
        }
    };

    const source = {
        html: detailText ? common.preprocessHtml(detailText) : ''
    };

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setEditTasks([])
        // Simulate an async action (e.g., fetching new data)
        taskHandler()
        getAttachments()
        setSelected(false);
        setRefreshing(false);
    }, [taskHandler, getAttachments]);

    useEffect(() => {
        setSelected(false)
    }, [options, titleModalVisible])

    return (
        <Pressable style={styles.container} onPress={() => setSelected(false)} >

            <DashboardHeader navigation={navigation} route={route} back={() => pressBackHandler(fromRef.current)}
                task={isLoading ? "" : Edittasks?.data?.tasks?.taskCode} />
            {isLoading ?
                <Loader
                    height='100%' />
                :
                <ScrollView keyboardShouldPersistTaps={"handled"} style={tw`w-full`}
                    showsVerticalScrollIndicator={false}
                    nestedScrollEnabled={true}
                    scrollEnabled={true}
                    onStartShouldSetResponderCapture={() => false}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            colors={[colors.theme]}
                        />
                    }>
                    <View style={styles.wrapper}>
                        <View style={styles.taskHeader}>
                            <Pressable style={styles.backIconHandler}
                                onPress={() => pressBackHandler(fromRef.current)}>
                                <BackIconComponent />
                            </Pressable>
                            <Pressable style={styles.taskNameWrapper}
                                onPress={() => setTitleModalVisible(true)}>
                                <Text style={styles.titleInput}>{title}</Text>
                            </Pressable>
                            <TitleModal
                                title={title}
                                editHandler={editHandler}
                                setTitle={setTitle} setTitleModalVisible={setTitleModalVisible} titleModalVisible={titleModalVisible} />
                        </View>
                        <>
                            <CustomOptionBar setOptions={setOptions} setOpenModal={setOpenModal} task={tasks?.tasks} time={time}
                                navigation={navigation} />
                            <View style={styles.detailWrapper}>
                                <ScrollView nestedScrollEnabled>
                                    <TouchableWithoutFeedback>

                                        <Pressable style={{
                                            paddingBottom: 10,
                                            minWidth: 340,
                                            minHeight: 170,
                                        }} onPress={() => {
                                            setModalVisible(true)
                                            setSelected(false)
                                        }}>
                                            <ScrollView showsVerticalScrollIndicator={false} style={{ width: widthPixel(365), padding: 5 }}
                                            >
                                                <RenderHtml
                                                    contentWidth={width}
                                                    source={source}
                                                />

                                            </ScrollView>
                                        </Pressable>
                                    </TouchableWithoutFeedback>
                                </ScrollView>
                            </View>

                            <LabelsView task={Edittasks?.data}
                                selected={selected}
                                setSelected={setSelected}
                            />

                            <DetailesLayout
                                setSelected={setSelected}
                                open={open}
                                setOpen={setOpen}
                                taskId={tasks?.tasks?.taskId}
                                companyId={tasks?.tasks?.companyId}
                                screenName={route}
                                navigation={navigation}
                                list={Edittasks}
                                userId={userInfos?.id}
                            />

                            <DetailModal
                                setDetailText={setDetailText}
                                detailText={detailText !== undefined ? detailText : ''}
                                modalVisible={modalVisible}
                                setModalVisible={setModalVisible}
                                taskID={tasks?.tasks?.taskId}
                            />

                            <SetTimeModal
                                setOptions={setOptions}
                                options={options}
                                openModal={openModal}
                                setTime={setTime}
                                taskId={tasks?.tasks?.taskId}
                                taskHandler={taskHandler}
                                userId={userInfos?.id || 0}
                            />
                        </>
                    </View>
                </ScrollView>
            }
        </Pressable>

    )
}

export default gestureHandlerRootHOC(EditTasks);