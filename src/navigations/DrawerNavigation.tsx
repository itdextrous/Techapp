import * as React from 'react';
import { DrawerContentComponentProps, DrawerContentScrollView, createDrawerNavigator } from '@react-navigation/drawer';
import TabNavigation from '@navigations/TabNavigation';
import { ActivityIndicator, Image, Platform, StyleSheet, Text, View } from 'react-native';
import { heightPixel, screenHeight } from '@utils/helpers/customStyles';
import { logout } from '@redux/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import CameraScreen from '@components/Camera';
import tw from 'twrnc';
import getTime from '@utils/helpers/datetime';
import { useEffect, useState } from 'react';
import { clearProfile } from '@redux/profileImageSlice';
import { googleSignout } from '@utils/config/googleSignin';
import CustomButton from '@components/common/Button';
import { RootReducer } from '@redux/store';

const Drawer = createDrawerNavigator();

// Create the custom component to add addition information 
const CustomDrawerContent = (props:DrawerContentComponentProps) => {
  const {userData} = useSelector((state: RootReducer) => state.auth);
  const { currentLocation } = useSelector((state: RootReducer) => state.userLocation);
  const dispatch = useDispatch();

  const {profileData,isLoading} = useSelector((state: any) => state.profileImage);
 const profileImage = profileData?.data?.value?.profileImageUrl
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
  
 const logoutHandler = async () => {
    dispatch(logout());
    dispatch(clearProfile())
     await googleSignout();
  }

  return (
    <DrawerContentScrollView {...props} bounces={false}>
      {/* Custom content */}
      <View style={styles.drawerWrapper}>
        <View style={styles.imageWrapper}>
          {isLoading?
            <ActivityIndicator size="small" color="rgba(120, 10, 200, 0.5)" /> 
            :
            <>
          {profileImage || userData?.data?.profileImage?
          <Image source={{uri:profileImage?profileImage:userData?.data?.profileImage}} resizeMode='cover' style={tw`w-full h-full rounded-full`}/>
        :
          <Text style={tw`text-2xl`}>U</Text>
        }
        </>
        }
          <CameraScreen navigation={undefined}/>
        </View>
        {/* Display profile name and information */}
        <Text style={styles.userName}>{userData?.data?.email?userData?.data?.email:'Test user'}</Text>
        <Text style={styles.email}>{userData?.data?.email?userData?.data?.email:'Test email'}</Text>
        <Text style={styles.email}>{currentTime}</Text>
        <Text style={styles.email}>{currentLocation}</Text>
      </View>
      <View style={styles.buttonWrapper}>
        <CustomButton mode="text" title='Logout' onPress={logoutHandler} customButtom={styles.customButtom} />
      </View>
    </DrawerContentScrollView>
  );
};

// Define the DrawerNavigation component
const DrawerNavigation = () => {
  return (
    <Drawer.Navigator drawerContent={CustomDrawerContent}>
      <Drawer.Screen name="Tab" component={TabNavigation} options={{
        headerShown: false,
      }} />
    </Drawer.Navigator>
  );
}


const styles = StyleSheet.create({
  drawerWrapper:{
    ...tw`items-center pt-8 border-b`,
    borderColor: 'rgba(214,224,243, 1)', 
    height:Platform.OS=='android'? screenHeight() - heightPixel(130):screenHeight()-heightPixel(150),
  },
  imageWrapper:{
    ...tw`border rounded-full justify-center items-center w-25 h-25`,
    borderColor: 'rgba(214,224,243, 1)', 
  },
  userName:{ 
    ...tw`text-lg font-semibold mt-4`,
  },
  email:{ 
    ...tw`text-sm mt-3`,
  },
  buttonWrapper:{ 
    ...tw`items-center justify-center h-20`, 
   },
  customButtom: {
    ...tw`border w-25`,
    borderColor: 'rgba(214,224,243, 1)', 
  },
})
export default DrawerNavigation;