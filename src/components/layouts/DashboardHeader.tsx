import BackIconComponent from '@assets/svgImages/backIcon';
import LocationComponent from '@assets/svgImages/location';
import CustomTooltip from '@components/CustomTooltip';
import ProfileSection from '@components/ProfileSection';
import ProfileImage from '@components/common/ProfileImage';
import { logout } from '@redux/authSlice';
import { clearProfile } from '@redux/profileImageSlice';
import { AppDispatch, RootReducer } from '@redux/store';
import { googleSignout } from '@utils/config/googleSignin';
import Icons from '@utils/helpers/Icons';
import { fontPixel, heightPixel, pixelSizeHorizontal, pixelSizeVertical, widthPixel } from '@utils/helpers/customStyles';
import * as React from 'react';
import { useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { Appbar } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import tw from 'twrnc';

// Define the type for LoginHeader props
type DashboardHeader = {
  title?: string,
  navigation?: any,
  onPress?: () => void,
  route?: any,
  searchHandler?: () => void;
  checkIns?: () => void;
  color?: string;
  back?: () => void;
  task?: string;
  setScannerVisible?: (item: boolean) => void,
  scannerVisible?: boolean,
  setState?: any,
  state?: any,
  deleteIcon?: any,
  notificationCount?: number | null
}

const DashboardHeader: React.FC<DashboardHeader> = ({ color,
  scannerVisible, setScannerVisible, task, route, searchHandler, checkIns, navigation, state, deleteIcon,
  notificationCount }) => {
  const screenName = route?.name;
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();
  const logoutHandler = async () => {
    setModalVisible(!modalVisible)
    dispatch(clearProfile())
    await googleSignout();
    dispatch(logout());
  }

  return (
    <Appbar.Header style={styles.appHeader}>
      <View style={{ width: "25%", }}>
        {screenName == 'DisplayPdf' ?
          <Pressable onPress={() => navigation.goBack()}>
            <BackIconComponent color='#FFF' />
          </Pressable>
          :
          <ProfileImage
            size={30}
            imageWrapper={styles.imageWrapper}
            setModalVisible={setModalVisible}
            modalVisible={modalVisible}
            textSize={17}
          />
        }
      </View>

      <ProfileSection modalVisible={modalVisible} setModalVisible={setModalVisible} logout={logoutHandler} />

      <View style={{ alignItems: 'center', width: '50%', paddingVertical: pixelSizeVertical(5) }} >
        <Appbar.Content title={screenName} color='white' titleStyle={{
          fontSize: fontPixel(18),
          fontFamily: 'NotoSans-Bold',
        }} style={{ justifyContent: 'center' }} />
        {task &&
          <Appbar.Content title={task} color='white' titleStyle={{
            fontSize: fontPixel(16),
            fontFamily: 'NotoSans-Regular',
          }} style={{ justifyContent: 'center' }}

          />
        }
      </View>
      <View style={{ flexDirection: 'row', width: "25%", justifyContent: 'flex-end' }}>
      {/* screenName == 'Check-In' ?
          <CustomTooltip component={
            <Pressable onPress={checkIns} style={{
              width: 40,
              alignItems: 'center',
              height: 40,
              justifyContent: 'center',
            }}>
              <LocationComponent color={color} />
            </Pressable>
          }
            setState={setState}
            state={state.first}
            title={"Click to checkIn and checkOut"}
            buttonTitle={"Next"}
            tooltipStyle={{ marginLeft: 10, }}
            tooltipHandler={tooltipHandler}
          />
          : */}
        {
          screenName == 'Assets' || screenName == 'Assets Details' ?
            <Pressable style={{ marginRight: pixelSizeHorizontal(10) }}
              onPress={() => setScannerVisible ? setScannerVisible(!scannerVisible) : null}>
              <Icons.MaterialCommunityIcons name='qrcode' color={'white'} size={25}
              />
            </Pressable>
            :
          screenName == 'DisplayPdf' ?
            deleteIcon && deleteIcon
            :
            screenName == 'Project' ?
              <Pressable style={{ marginRight: pixelSizeHorizontal(10) }}
                onPress={() => navigation.navigate('Notification')}>
                <Icons.Ionicons name='notifications-outline' color={'white'} size={25}
                />
                <View style={styles.notifications}>
                  <Text style={{
                    fontSize: fontPixel(10),
                    fontFamily: 'NotoSans-Bold',
                  }}>{notificationCount && notificationCount > 99 ? '99+' : notificationCount}</Text>
                </View>
              </Pressable>
              :
              screenName == 'Tasks ' ?
                <Pressable style={{ marginRight: pixelSizeHorizontal(10) }}
                  onPress={searchHandler}>
                  <Icons.Ionicons name='search' color={'white'} size={23}
                  />
                </Pressable>
                :
                null
        }
      </View>

    </Appbar.Header>
  )
}

const styles = StyleSheet.create({
  imageWrapper: {
    ...tw`border rounded-full justify-center items-center w-8 h-8`,
    backgroundColor: 'white',
    borderColor: 'rgba(214,224,243, 1)',
  },
  appHeader: {
    width: Platform.OS == 'ios' ? widthPixel(420) : '100%',
    paddingHorizontal: pixelSizeHorizontal(15),
    backgroundColor: 'rgba(54,52,53, 1)'
  },
  notifications: {
    borderRadius: 100,
    width: widthPixel(20),
    height: heightPixel(20),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    backgroundColor: 'white',
    top: -8,
    left: 13
  }
})

export default DashboardHeader;