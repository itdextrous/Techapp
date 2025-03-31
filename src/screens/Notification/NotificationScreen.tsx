import DashboardHeader from "@components/layouts/DashboardHeader";
import { notificationList } from "@redux/notificationSlice";
import { AppDispatch, RootReducer } from "@redux/store";
import encryptParams from "@utils/helpers/encrypter";
import { useCallback, useEffect, useState } from "react";
import { BackHandler, FlatList, Pressable, RefreshControl, Text, TouchableOpacity, View } from "react-native"
import { useDispatch, useSelector } from "react-redux";
import tw, { style } from 'twrnc';
import styles from "./styles";
import { INotifications } from "@interfaces/notifications";
import CustomButton from "@components/common/Button";
import { Avatar } from "react-native-paper";
import getTime from "@utils/helpers/datetime";
import { colors, heightPixel, pixelSizeHorizontal, pixelSizeVertical } from "@utils/helpers/customStyles";
import Loader from "@components/common/Loader";
import BackIconComponent from "@assets/svgImages/backIcon";


const NotificationScreen = ({ route, navigation }: any) => {
  const { isLoading } = useSelector((state: RootReducer) => state.notificationsList);
  const [notifications, setNotifications] = useState<INotifications[] | null | undefined>([])
  const [pages, setPages] = useState<any>({
    pageSize: 10,
    pageNumber: 0
  })
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setPages({
      pageSize: 10,
      pageNumber: 0,
    });
    getNotifications(10, 0);
  }, [])
  const taskHandler = (item: any) => {
    navigation.navigate('Tasks', {
      screen: 'Edit Task',
      params: {
        from: 'Notification', // Indicates the source of navigation
        task: item // Passes the task details
      }
    })
  }

  const getNotifications = async (pageSize: number, pageNumber: number) => {
    const param = {
      getCount: false, // true/false
      pageSize: pageSize, // number
      pageNumber: pageNumber //number
    };
    const encriptedString = encryptParams(param)
    const response = await dispatch(notificationList(encriptedString))
    if (response) {
      setNotifications(response.payload.data?.item2)
    }
  }

  type IItem = {
    item: INotifications,
    time: string,
    onPress: () => void
  }
  const Item = ({ item, time, onPress }: IItem) => (
    <TouchableOpacity style={styles.notificationContainer} onPress={onPress}>
      {item?.profileImageUrl ?
        <Avatar.Image size={40} source={{ uri: item?.profileImageUrl }}
          style={{ backgroundColor: 'white' }} />
        :
        <Avatar.Text size={40}
          style={styles.imageWrapper}
          label={item?.name ? item.name.substring(0, 1) : ''} />
      }
      <View style={{
        width: '58%',
        paddingHorizontal: pixelSizeHorizontal(10)
      }}>
        <Text style={[styles.text, styles.messageText]}>{item.logMessage}</Text>
        <Text style={styles.text}>{item.taskTitle}</Text>
        <Text style={styles.codeNumber}>{item.taskCode}</Text>
      </View>
      <View style={{ alignItems: 'flex-end', width: '30%' }}>
        <Text>{time}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderItem = ({ item }: { item: INotifications }) => {
    const date = new Date(item.logDateTime);
    const isoString = date.toISOString();
    const time = getTime.TimeDifference(isoString);
    return (
      <Item
        item={item}
        time={time}
        onPress={() => taskHandler(item)}
      />
    );
  };

  const loadHandler = () => {
    setPages((prev: any) => ({
      ...prev,
      pageSize: prev.pageSize + 10, // Update the `pageSize` property
    }));
    getNotifications(pages.pageSize + 10, 0)
  }
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate an async action (e.g., fetching new data)
    getNotifications(pages.pageSize, pages.pageNumber)
    setRefreshing(false);
  }, []);

  return (
    <Pressable style={tw`flex items-center bg-white flex-1`}>
      <DashboardHeader route={route} />
      <View style={styles.taskHeader}>
        <Pressable style={styles.backIconHandler}
          onPress={() => navigation.goBack()}>
          <BackIconComponent />
        </Pressable>
        <Pressable style={styles.taskNameWrapper}>
          <Text style={styles.titleInput}>Notification History</Text>
        </Pressable>
      </View>
      {isLoading &&
        <Loader
          height='100%' />
      }
      <View style={[tw` w-full px-5 mt-1`,
      {
        height: heightPixel(660),
      }
      ]}>

        <FlatList
          data={notifications}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          style={{
            marginVertical: pixelSizeVertical(10)
          }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[colors.theme]}
              tintColor={colors.theme}
            />
          }
          showsVerticalScrollIndicator={false}
        />
        <CustomButton title="Load More" onPress={loadHandler} customButtom={styles.customButton} />
      </View>
    </Pressable>
  )
}

export default NotificationScreen;