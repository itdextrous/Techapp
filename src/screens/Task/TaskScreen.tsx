import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { Pressable, RefreshControl, ScrollView, View } from "react-native"
import DashboardHeader from "@components/layouts/DashboardHeader";
import InputText from "@components/common/InputText";
import styles from "@screens/Task/styles";
import DropdownItems from "@components/Dropdown";
import { Icon } from "react-native-paper";
import Loader from "@components/common/Loader";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootReducer } from "@redux/store";
import { colors, fontPixel, pixelSizeHorizontal } from "@utils/helpers/customStyles";
import encryptParams from "@utils/helpers/encrypter";
import { projectStatus, taskList } from "@redux/taskListSclice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AllTasksList, ITaskPayload, Status, Task, TaskLists } from "@interfaces/tasks";
import { useFocusEffect } from "@react-navigation/native";
import Labels from "./Labels";
import Tasks from "./Tasks";
import TaskListService from "@services/taskList.service";

const TaskScreen = ({ navigation, route }: any) => {
    const dispatch = useDispatch<AppDispatch>();
    const { userInfos } = useSelector((state: RootReducer) => state.userInformation);
    const { projectListData } = useSelector((state: RootReducer) => state.projectList);
    const { isLoading } = useSelector((state: RootReducer) => state.taskList);

    const allProjects = projectListData?.data?.lists?.projects

    const [visible, setVisible] = useState<boolean>(false);
    const [value, setValue] = useState<any>(null);
    const [searchText, setSearchText] = useState<string>("");
    const [newStatusList, setNewStatusList] = useState<any>([])
    const [refreshing, setRefreshing] = useState(false);
    const [tasksList, setTasksList] = useState<Task[]>([])
    const [selectedTasks, setSelectedTasks] = useState<Task[]>([])
    const [taskId, setTaskId] = useState<number | null>(null)
    const [selected, setSelected] = useState<any>();
    const [serchLoadings, setSearchLoadings] = useState<boolean>(false)

    useFocusEffect(
        useCallback(() => {
            setVisible(false)
            setSearchText("")
            setTasksList([])
            setTaskId(null)
            setValue(null)
            setSelected(null)
            setNewStatusList([])
            setTimeout(() => {
                getSelectedTask();
            }, 0);
        }, [route])
    );

    const getSelectedTask = async () => {
        let getTask: any = await AsyncStorage.getItem('tasks');
        const parsedTask = JSON.parse(getTask || '{}');
        if (parsedTask && Object.keys(parsedTask).length !== 0 && parsedTask.constructor === Object) {
            setValue(parsedTask);
            getStatusList(parsedTask.id);
            setTaskId(parsedTask.id)
        }
    }
    const searchHandler = useCallback(() => {
        setVisible(prev => !prev);
    }, []);

    const closeHandler = () => {
        setVisible(false);
        setTasksList(selectedTasks)
        setSearchText("")
    };

    const getStatusList = useCallback(async (projectId: number) => {
        const params = { projectId };
        let encryptedParams = encryptParams(params)

        try {
            const response = await dispatch(projectStatus(encryptedParams))

            if (response) {
                const status = response.payload.data
                const filterdStatus = status.filter((item: Status) => item.count !== 0)
                setNewStatusList(filterdStatus)
                handleTaskList(projectId, filterdStatus[0].id.toString())
                setSelected(filterdStatus[0])
            }
        } catch (error) {
            console.error('Error fetching status list:', error);
        }
    }, [dispatch]);

    const handleTaskList = async (task?: any, statusId?: string) => {
        const payload: ITaskPayload = {
            userId: userInfos?.id,
            taskId: 0,
            priorityNames: "",
            statusNames: "",
            assigneeIds: "",
            searchTask: "",
            tileStatus: 0,
            companyId: userInfos?.companyId,
            workspaceIds: "",
            boardIds: "",
            projectIds: value == null ? !taskId ? task == undefined ? 0 : task : taskId : value?.id,
            viewScreen: 1,
            taskType: "All",
            page: 0,
            pageSize: 50,
            labelIds: "",
            sortOption: userInfos?.userconfig?.Workhub?.Tasks?.sortOption,
            sortOrder: userInfos?.userconfig?.Workhub?.Tasks?.sortOrder,
            showCompleted: true,
            isBulkRequest: false,
            isProjectsGrouping: false,
            statusIds: statusId ? statusId : ""
        }

        try {
            const response = await dispatch(taskList(payload))
            let data: any = response.payload.data.tasks

            if (!data) {
                return []
            }

            // Flatten the list of tasks from each item in taskListData.data.tasks
            const allTasksList: TaskLists[] = data.flatMap((item: AllTasksList) => item.list || []);

            // Further flatten to get individual tasks from each list
            const allTasks: Task[] = allTasksList.flatMap((item: TaskLists) => item.tasks || []);
            // New inlineLists data
            const labelProjects = response.payload.data.projectLabels
            // Update the inlineLists property for each task
            const updatedTasks = allTasks.filter(task => task.projectName !== null)
                .map(task => ({ ...task, inlineLists: labelProjects }));
            // Updated taskData
            const updatedTaskData = { ...allTasks, tasks: updatedTasks };
            if (updatedTaskData?.tasks?.length == 0) {
                setTasksList([])
                setSelectedTasks([])
            } else {
                setTasksList(updatedTaskData?.tasks)
                setSelectedTasks(updatedTaskData?.tasks)
            }
        } catch (error) {
            setTasksList([])
        }
    };

    useEffect(() => {
        if (value?.id !== undefined && value?.id !== taskId) {
            setNewStatusList([]);
            setTasksList([]);
            setSelected(null);
            setTaskId(value?.id);
            getStatusList(value?.id);
        }
    }, [value]);

    const taskHandler = useCallback((item: Task) => {
        AsyncStorage.setItem('tasks', JSON.stringify(value))
        navigation.push('Edit Task', {
            from: 'task',
            task: item
        });
    }, [value]);

    const taskSearchHandler = useCallback(async (text: string) => {
        setSearchText(text)
        // If the search text is empty, show all tasks
        if (text.trim() === "") {
            setTasksList(selectedTasks) // Show all tasks if the text is empty
        } else if (text.length > 2) {
            setTasksList([]);
            setSearchLoadings(true)
            const param = {
                projectIds: value == null ? 0 : value?.id,
                searchTask: text.trim()
            };
            let encryptedParams = encryptParams(param)
            const response = await TaskListService.taskSearch(encryptedParams)
            if (response.data.length !== 0) {
                const tasks = response.data.filter((items: any) => items.taskCode);
                setTasksList(tasks);
            } else {
                setTasksList([]);
            }
        } else {
            setTasksList([]);
        }
        setSearchLoadings(false)

    }, [searchText]);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        // Simulate an async action (e.g., fetching new data)
        try {
            setTasksList([])
            setTaskId(null)
            setValue(null)
            setSelected(null)
            setNewStatusList([])
            setTimeout(() => {
                getSelectedTask(); // ✅ Prevent immediate state update
            }, 0);// Set the fetched tasks into state
        } catch (error) {
            console.error("Error fetching tasks: ", error);
        } finally {
            setRefreshing(false);
        }
    }, []);

    return (
        <View style={styles.wrapper} >
            <DashboardHeader navigation={navigation} route={route} searchHandler={searchHandler} />
            {isLoading ?
                <Loader
                    // top='23%'
                    height='100%' />
                :
                <ScrollView bounces={false} style={{ width: '100%' }}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            colors={[colors.theme]}
                            tintColor={colors.theme}
                        />
                    }
                    showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={"handled"}>
                    <View style={styles.searchWrapper}>
                        {searchText == "" && <Labels data={newStatusList}
                            selected={selected} setSelected={setSelected} handleTaskList={handleTaskList} />
                        }
                        {visible ?
                            <View style={styles.search}>
                                <InputText
                                    placeholder="Search task"
                                    placeholderColor="#BFC0CB"
                                    textInput={styles.textInput}
                                    autoFocus
                                    value={searchText}
                                    inputWrapper={{ marginTop: 0, marginRight: pixelSizeHorizontal(20), flex: 1, borderColor: "#E9EDF4" }}
                                    onChangeText={(text) => taskSearchHandler(text)}
                                />
                                <Pressable onPress={closeHandler}>
                                    <Icon
                                        source="close"
                                        size={fontPixel(30)}
                                    />
                                </Pressable>
                            </View>
                            :
                            <View style={styles.container}>
                                <DropdownItems
                                    data={allProjects ? allProjects : []}
                                    value={value == null ? value : value.value}
                                    setValue={setValue}
                                    placeholder={'Selected Project'}
                                    icon={true}
                                    search={true}
                                    selectedTextStyle={{ color: "#100C08" }}
                                    dropDownStyle={{
                                        borderWidth: 1,
                                        borderColor: "rgba(233, 237, 244, 1)"
                                    }} />
                            </View>
                        }
                    </View>
                    <View style={[styles.searchWrapper, { height: '100%' }]}>
                        <Tasks
                            allProjects={tasksList}
                            onPress={(item: Task) => taskHandler(item)}
                            serchLoadings={serchLoadings}
                        />
                    </View>
                </ScrollView>
            }
        </View>
    )
}

export default memo(TaskScreen);