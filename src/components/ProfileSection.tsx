import { fontPixel, heightPixel, pixelSizeHorizontal, pixelSizeVertical, widthPixel } from "@utils/helpers/customStyles";
import { useEffect, useState } from "react";
import { Image, Platform, StyleSheet, Text, View, ViewStyle } from "react-native"
import { useSelector } from "react-redux";
import tw from 'twrnc';
import getTime from "@utils/helpers/datetime";
import CustomButton from "./common/Button";
import { Modal, Portal } from 'react-native-paper';
import React from "react";
import { RootReducer } from "@redux/store";
import ProfileImage from "./common/ProfileImage";
import LogoutComponent from "@assets/svgImages/Logout";


type ProfileSection = {
  modalVisible: boolean,
  setModalVisible: (text: boolean) => void,
  logout: () => void;
}
const ProfileSection: React.FC<ProfileSection> = ({ modalVisible, setModalVisible, logout }) => {
  const { userInfos } = useSelector((state: RootReducer) => state.userInformation);
  const { currentLocation } = useSelector((state: RootReducer) => state.userLocation);
  // State to store the current time
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    // Update the current time every second
    const interval = setInterval(() => {
      const time = getTime.UpdateTimeWithGMT;
      setCurrentTime(time);
    }, 1000);
    // Clear the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const hideModal = () => setModalVisible(false);

  return (
    <View>
      <Portal >
        <Modal visible={modalVisible} onDismiss={hideModal} contentContainerStyle={styles.container}
        >
          <View style={styles.modalView}>
            <View style={{ paddingVertical: pixelSizeVertical(22), paddingHorizontal: pixelSizeHorizontal(15), }}>
              <View style={{ alignItems: 'center', marginBottom: pixelSizeVertical(15) }}>
                <ProfileImage
                  size={100}
                  screenName={'Profile'}
                  imageWrapper={styles.imageWrapper}
                  textSize={50}
                />
                <Text style={styles.userName}>{
                  `${userInfos?.firstName} ${userInfos?.lastName}`}</Text>
              </View>
              <Text style={styles.email}>{userInfos?.email ? userInfos?.email : 'Test email'}</Text>
              <Text style={styles.email}>{currentTime}</Text>
              {currentLocation &&
                <Text style={styles.email}>{(currentLocation)}</Text>
              }
            </View>
            <View style={styles.buttonWrapper}>
              <LogoutComponent />
              <CustomButton mode="text" title='Logout' onPress={logout} buttonTitle={styles.buttonTitle} customButtom={styles.customButtom} />
            </View>
          </View>
        </Modal>
      </Portal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    ...tw`absolute bg-white justify-center w-6/10 `,
    borderRadius: 5,
    top: 0,
  },
  centeredView: {
    ...tw`absolute flex justify-center w-6/10`,
    marginTop: Platform.OS == 'android' ? 0 : pixelSizeVertical(60),
  },
  modalView: {
    ...tw` pt-5 bg-white`,
    shadowColor: '#000',
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: 'rgba(230, 230, 250, 1)',

  },
  imageWrapper: {
    ...tw`border rounded-full justify-center items-center w-25 h-25`,
    borderColor: 'rgba(214,224,243, 1)',
  },
  userName: {
    ...tw` mt-3`,
    color: 'rgba(71,83,120,1)',
    fontSize: fontPixel(16),
    fontFamily: 'NotoSans-SemiBold',
  },
  email: {
    ...tw` mt-1`,
    color: 'rgba(71, 83, 120, 1)',
    fontSize: fontPixel(15),
    fontFamily: 'NotoSans-Regular',
    lineHeight: 18,
  },
  buttonWrapper: {
    ...tw`border-t items-center flex-row h-13`,
    borderColor: 'rgba(230,230,250,1)',
    paddingHorizontal: pixelSizeHorizontal(15)

  },
  customButtom: {
    ...tw``,
  },
  buttonTitle: {
    fontSize: fontPixel(16),
    color: 'rgba(71,83,120,1)',
  },

});
export default ProfileSection;