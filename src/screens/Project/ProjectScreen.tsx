import DashboardHeader from "@components/layouts/DashboardHeader";
import { Pressable, RefreshControl, ScrollView, Text, View } from "react-native"
import tw from 'twrnc';
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useMemo, useState } from "react";
import InputText from "@components/common/InputText";
import styles from "@screens/Project/styles";
import Allprojects from "@screens/Project/AllProjects";
import Favorites from "@screens/Project/Favorites";
import { favProjectList, projectList, favProject } from "@redux/projectListSlice";
import { AppDispatch, RootReducer } from "@redux/store";
import { IProjectList, IProjects } from "@interfaces/projectList";
import Loader from "@components/common/Loader";
import * as React from 'react';
import { Icon } from "react-native-paper";
import { user } from "@redux/userSlice";
import encryptParams from "@utils/helpers/encrypter";
import { colors, fontPixel, pixelSizeHorizontal } from "@utils/helpers/customStyles";
import { notificationList } from "@redux/notificationSlice";
import { userPermissions } from "@redux/permissionSlice";


const ProjectScreen = ({ navigation, route }: any) => {
    const dispatch = useDispatch<AppDispatch>();
    const { userData } = useSelector((state: RootReducer) => state.auth);
    const { userInfos } = useSelector((state: RootReducer) => state.userInformation);
    const { projectListData, favProjectListData, isLoading } = useSelector((state: any) => state.projectList);
    const allNewProjects = projectListData?.data?.lists
    const [favProjects, setFavProjects] = useState<IProjects[]>([])
    const [filteredProjects, setFilteredProjects] = useState<any>({})
    const [active, setActive] = useState<string[]>([])
    const [updateUserID, setUpdateUserID] = useState<any>()
    const [searchText, setSearchText] = useState<string>("")
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [notificationCount, setNotificationCount] = useState<number | null>(0);

    useEffect(()=>{
        const setup = async () => {
            await setDecodeData();
            await getProjectList();
            getNotifications();
        };
    
        setup();
    },[updateUserID,navigation])
    // decode the jwtToken and save async storage
    const setDecodeData = async () => {
        const token: string | null | undefined = userData?.data?.token;
        const response = await dispatch(user(token))
        
        if (response) {
            setUpdateUserID(response.payload.id)
        }
        AsyncStorage.setItem('token', JSON.stringify(token))
        await dispatch(userPermissions())
    }

    // consume the project list api
    const getProjectList = async () => {
        setFilteredProjects({})
        const payload: IProjectList = {
            companyId: userInfos ? userInfos?.id : 0,
            search: '',
            // workspaceId: [0],
            boardId: [],
            archived: false,
            projectId: 0
        }
        await getFav();
        dispatch(projectList(payload))
    }

    const getNotifications = async () => {
        const param = {
            getCount: true, // true/false
            pageSize: 0, // number
            pageNumber: 0 //number
        };
        const encriptedString = encryptParams(param)
        const response = await dispatch(notificationList(encriptedString))
        if (response) {
            setNotificationCount(response.payload.data?.item1)
        }
    }

    // useEffect to update filtered projects
    useEffect(() => {

        if (allNewProjects) {
            setFilteredProjects(allNewProjects)
        }
        if (favProjectListData?.data) {
            setFavProjects(favProjectListData.data)
        }

    }, [projectListData, favProjectListData]);

    const allProjectsHandler = (item: IProjects) => {
        AsyncStorage.setItem('tasks', JSON.stringify(item));
        navigation.navigate('Tasks', { screen: 'Tasks ',
            params: {
                name: 'project', // Parameters go here
              },
         });
    }

    const getFav = async () => {
        const value = {
            userId: userInfos?.id
        }
        const encriptedString = encryptParams(value)
        const response = await dispatch(favProjectList(encriptedString))
        const newProjectIds = response?.payload?.data?.map((item: any) => item.id.toString());
        setActive(newProjectIds)
    }

    // Handle project search based on input text
    const projectSearchHandler = (text: string) => {
        setSearchText(text)
        const projects = allNewProjects?.data?.flatMap((item: any) => item);
        const searchList = projects.filter((items: any) => {
            
            return (
                items.value.toLowerCase().includes(text.toLowerCase()) ||
                (items.workspace && items.workspace.workspaceName && items.workspace.workspaceName.toLowerCase().includes(text.toLowerCase()))
                ||
                (items.board && items.board.boardName && items.board.boardName.toLowerCase().includes(text.toLowerCase()))

            );
        })
        let searchData = {
            ...filteredProjects, // Copy all other properties from data
            data: [searchList] // Replace projects with filteredProjects
        };
        setFilteredProjects(searchData)
    }

    const toggleStar = async (item: IProjects) => {
        // Determine if item.id is currently in active state
        const isSelected = active?.includes(item?.id?.toString());

        const payload = {
            UserId: userInfos ? userInfos?.id : 0,
            projectId: item.id,
            action: isSelected ? "resetfavourite" : "setfavourite"
        };
        // Dispatch action with payload and handle response
        const response = await dispatch(favProject(payload));
        if (response.payload.data) {
            getFav();
        }
    };

    const idsToExclude = useMemo(() => favProjects.map(item => item.id), [favProjects]);

    // Filter projects and store all data
    const filteredStarred = useMemo(() => {
        if (filteredProjects?.data) {
            const filteredProject3 = filteredProjects.data[0]?.filter((project: any) => !idsToExclude.includes(project.id));
            return { ...filteredProjects, data: [filteredProject3] };
        }
        return {};
    }, [filteredProjects, idsToExclude]);

   const filteredAllProjects = useMemo(() => {
        if (filteredProjects?.data) {
            const filteredProject3 = filteredProjects.data[0]?.filter((project: any) => idsToExclude.includes(project.id));
            return { ...filteredProjects, data: [filteredProject3] };
        }
        return {};
    }, [filteredProjects, idsToExclude]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        // Simulate an async action (e.g., fetching new data)
            getProjectList()
            getNotifications()
            setRefreshing(false);
    }, [filteredProjects]);

    const searchHandler = ()=>{
        setSearchText("");
        setFilteredProjects(allNewProjects)
    }
    return (
            <Pressable style={tw`flex items-center bg-white flex-1`}>
                {isLoading &&
                    <Loader
                        // top='10%'
                        height='100%' />
                }
                <DashboardHeader route={route} navigation={navigation} notificationCount={notificationCount} />
                <ScrollView bounces={false} style={{ width: '100%' }}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps={'handled'}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            colors={[colors.theme]}
                            tintColor={colors.theme}
                        />
                    }>

                    <View style={tw`h-full w-full px-5`}>
                    <View style={styles.search}>
                        <InputText placeholder="Search Projects" 
                        textInput={styles.textInput}
                        value={searchText}
                            onChangeText={(text) => projectSearchHandler(text)}
                            placeholderColor="#BFC0CB" 
                            inputWrapper={{ marginTop: 0, marginRight: pixelSizeHorizontal(20), 
                                flex: 1 ,borderColor: "#E9EDF4" }}
                            />
                                <Pressable onPress={searchHandler}>
                                <Icon
                                    source="close"
                                    size={fontPixel(30)}
                                />
                            </Pressable>
                            </View>
                        <Text style={styles.project}>Starred Projects</Text>
                        <Favorites allProjects={filteredAllProjects} onPress={allProjectsHandler}
                            getFav={getFav}
                            toggleStar={toggleStar}
                        />
                        <Text style={styles.project}>All Projects</Text>
                        <Allprojects
                            getFav={getFav}
                            toggleStar={toggleStar}
                            allProjects={filteredStarred} onPress={allProjectsHandler}
                        />
                    </View>
                </ScrollView>
            </Pressable>
    )
}

export default React.memo(ProjectScreen);