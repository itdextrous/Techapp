import { AppDispatch, RootReducer } from "@redux/store";
import Icons from "@utils/helpers/Icons";
import { FlatList, Pressable, RefreshControl, ScrollView, Text, View, useWindowDimensions } from "react-native"
import { Avatar } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles";
import { useCallback, useEffect, useState } from "react";
import { notesList, updateNotes } from "@redux/notesSlice";
import encryptParams from "@utils/helpers/encrypter";
import { ITaskEdit } from "@interfaces/editTasks";
import DashboardHeader from "@components/layouts/DashboardHeader";
import BackIconComponent from "@assets/svgImages/backIcon";
import getTime from "@utils/helpers/datetime";
import RenderHtml from 'react-native-render-html';
import DetailModal from "./detailModal";
import Loader, { CustomLoader } from "@components/common/Loader";
import common from "@utils/helpers/commonFunction";
import { INotes } from "@interfaces/notes";
import { colors, fontPixel, pixelSizeVertical, widthPixel } from "@utils/helpers/customStyles";
import renderersProps from "@utils/helpers/renderHtml";
import tw from 'twrnc';
import TitleModal from "./EditTitleModal";
import { editTasks } from "@redux/taskEditSlice";
import Toast from "react-native-toast-message";
import AudioPlayer from "./AudioPlayer";
import { audio } from "@redux/audioSlice";
import { requestPermissions } from "@utils/helpers/permissions";
import RecorderView from "./RecorderView";
import AudioModal from "./AudioModal";
import RecorderIcon from "@assets/svgImages/recorder";
import AddCircleIcon from "@assets/svgImages/addCircleIcon";

const Notes = ({ navigation, route }: any) => {
  const { notesData, isLoading } = useSelector((state: RootReducer) => state.notesList);
  const { userInfos } = useSelector((state: RootReducer) => state.userInformation);
  const { taskEditData } = useSelector((state: RootReducer) => state.taskEdit);
  const { audioResponse, loading } = useSelector((state: RootReducer) => state.audio);
  const tasks: ITaskEdit | null | undefined = taskEditData?.data;
  const [detailText, setDetailText] = useState<string | undefined>('')
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [audioPlayerVisible, setAudioPlayerVisible] = useState<boolean>(false)
  const [updatedNotes, setupdatedNotes] = useState<any>([])
  const [clickNote, setClickNote] = useState<any>()
  const [refreshing, setRefreshing] = useState(false);
  const [title, setTitle] = useState<string | undefined>(undefined)
  const [titleModalVisible, setTitleModalVisible] = useState(false);
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [micModalVisible, setMicModalVisible] = useState<boolean>(false)
  const [audioLoad, setaudioLoad] = useState<boolean>(false)

  const { width } = useWindowDimensions();
  const dispatch = useDispatch<AppDispatch>();

  type Items = {
    item: INotes,
    index: number,
    onPress: () => void;
    source: any,
    duration: number
  }

  const showToast = (width: any, text: string | undefined) => {
    Toast.show({
      type: 'customToast',
      text2: text,
      position: 'top',
      props: styles.toastStyle
    });
  };
  useEffect(() => {
    getNotes()
    setTitle(tasks?.tasks.taskTitle)

  }, [audioResponse])

  const goBackHandler = () => {
    navigation.goBack()

  }

  const getNotes = () => {
    let value = {
      taskId: tasks?.tasks?.taskId
    }
    const encriptedString = encryptParams(value)
    dispatch(notesList(encriptedString))
  }

  useEffect(() => {
    setupdatedNotes(notesData)
  }, [notesData])

  const handlePress = (item: any, index: number) => {
    setDetailText(item.message);
    setClickNote(item)
    setModalVisible(!modalVisible);
  };

  const handleSave = async (newMessage: string) => {
    if (newMessage !== "") {
      const payload = {
        messageId: clickNote?.messageId ? clickNote.messageId : 0, // 0 in case of new or message id for edit
        message: newMessage,
        time: new Date().toISOString(),
        userId: userInfos?.id, // logged  user Id
        taskId: tasks?.tasks.taskId // task id for which notes is to be added/updated
      }
      setClickNote(null)
      const response = await dispatch(updateNotes(payload))
      if (response) {
        getNotes()
      }
      showToast(widthPixel(150), 'changes saved');
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate an async action (e.g., fetching new data)
    setTimeout(() => {
      getNotes()
      setRefreshing(false);
    }, 2000); // Adjust timeout as needed
  }, [notesData]);

  const audioPath = async (item: INotes) => {
    setaudioLoad(true)
    if (item.audioFilePath) {
      const params = {
        messageId: item.messageId,
      };
      const encryptedParams = encryptParams(params)
      const res = await dispatch(audio(encryptedParams))
      if (res) {
        setaudioLoad(false)
        setAudioPlayerVisible(true)
      }
    }
    setaudioLoad(false)
  }
  const editHandler = () => {
    if (!title) return;
    const payload = {
      taskId: tasks?.tasks.taskId,
      isInline: true,
      inlineTarget: "taskTitle",
      taskTitle: title
    }
    dispatch(editTasks(payload))
  };

  const addHandler = () => {
    setModalVisible(true),
      setDetailText('')
  }

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



  const Item = ({ item, index, onPress, source, duration }: Items) => (
    <Pressable onPress={userInfos?.id == item.userId && item.message !== "" ? onPress : null}>
      <View style={[styles.notesWrapper,
      { borderBottomWidth: index == updatedNotes.data.length - 1 ? 0 : 1 }]
      }>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ width: '14%' }}>
            {item.profileImageUrl ?
              <Avatar.Image size={35}
                source={{ uri: item.profileImageUrl }}
                style={{ backgroundColor: 'white' }} />
              :
              <View style={[
                tw`border rounded-full justify-center items-center w-9 h-9`, {
                  borderColor: 'rgba(214,224,243, 1)',
                  alignItems: 'center',
                }]}>
                <Text style={{
                  fontSize: fontPixel(20)
                }}>{item?.userName ? item.userName.substring(0, 1) : ''}</Text>
              </View>
            }
          </View>

          <View style={styles.chatTimer}>

            <Text style={{ color: '#0A0F1A', fontFamily: 'NotoSans-Medium' }}>{item.userName}</Text>
            <View style={{ flexDirection: 'row' }}>
              {userInfos?.id == item.userId && item.message !== "" &&
                <Icons.MaterialIcons name="mode-edit" size={18}
                />
              }
              <Text style={{
                fontFamily: 'NotoSans-Regular',
                fontSize: fontPixel(15)
              }}>{getTime.formatDateString(item.createdDateTime)}</Text>
            </View>
          </View>

        </View>

        <View style={styles.chats}>
          {item.message == "" ?
            <Pressable style={styles.audioWrapper}
              // onPressIn={()=>audioPath(item)}
              onPress={() => {
                audioPath(item)
              }}
            >
              <Icons.Entypo name="controller-play" size={22} color={"#8585F2"} />
              <Text>{duration}</Text>


            </Pressable>
            :
            <RenderHtml
              contentWidth={width}
              source={source}
              renderersProps={renderersProps}
            />
          }
        </View>
      </View>
    </Pressable>
  );

  const renderItem = ({ item, index }: { item: INotes, index: number }) => {
    const source = {
      html: item.message !== "" ? common.preprocessHtml(item.message) : item.message == undefined ? '' : ''
    };
    const duration: any = getTime.formatDuration(item.duration)

    return (
      <Item
        item={item}
        index={index}
        source={source}
        duration={duration}
        onPress={() => handlePress(item, index)}
      />
    );
  };


  return (
    <View style={styles.container} >
      <DashboardHeader navigation={navigation} route={route}
        task={taskEditData?.data?.tasks?.taskCode} />

      <View style={styles.taskHeader}>
        <Pressable style={styles.backIconHandler}
          onPress={goBackHandler}
        >
          <BackIconComponent />
        </Pressable>
        <AudioPlayer setAudioPlayerVisible={setAudioPlayerVisible} audioPlayerVisible={audioPlayerVisible} />
        <Pressable style={styles.taskNameWrapper}
          onPress={() => setTitleModalVisible(true)}>
          <Text style={styles.titleInput}>{title}</Text>
        </Pressable>
        <TitleModal
          title={title}
          editHandler={editHandler}
          setTitle={setTitle} setTitleModalVisible={setTitleModalVisible} titleModalVisible={titleModalVisible} />
      </View>
      {audioLoad && <CustomLoader
        // top='20%'
        height='100%' />}
      {isLoading || loading ?
        <Loader
          // top='20%'
          height='100%' />
        :
        <ScrollView keyboardShouldPersistTaps={"handled"} style={{ width: '90%', marginTop: pixelSizeVertical(10) }}
          showsVerticalScrollIndicator={false}
          refreshControl={

            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => !showMessage ? onRefresh() : null}
              colors={[colors.theme]}
              tintColor={colors.theme}
            />
          }>
          <View style={styles.notesContainer}>
            <Text style={styles.notesTitle}>Notes</Text>
            <Pressable
              style={styles.micWrapper}>

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
              <Pressable
                style={[styles.saveButton, {
                  borderColor: '#9E9E9E',
                }]}
                onPress={addHandler}
              >
                <AddCircleIcon />
              </Pressable>
            </Pressable>

          </View>
          {notesData?.data?.length == 0 ?
            <View style={{
              alignItems: 'center',
              marginTop: pixelSizeVertical(20)
            }}>
              <Text style={{ fontFamily: 'NotoSans-Medium' }}>No Records</Text>
            </View>
            :
            <View style={styles.chatContainer}>
              <FlatList
                data={updatedNotes?.data || []}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                scrollEnabled={false}
              />
            </View>
          }
          <AudioModal
            setShowMessage={setShowMessage}
            showMessage={showMessage}
            micModalVisible={micModalVisible}
            setMicModalVisible={setMicModalVisible}
          />

          <DetailModal
            setDetailText={setDetailText}
            detailText={detailText !== undefined ? detailText : ''}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            handleSave={handleSave}
          />

        </ScrollView>
      }

    </View>

  )
}

export default Notes;
