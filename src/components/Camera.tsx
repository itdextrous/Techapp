import React, {useState } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import{ImageOrVideo} from 'react-native-image-crop-picker';
import CameraModel from '@components/CameraModel';
import { useDispatch, useSelector } from 'react-redux';
import tw from 'twrnc';
import { profileImage } from '@redux/profileImageSlice';
import { AppDispatch, RootReducer } from '@redux/store';
import { IprofileParams } from '@interfaces/profileImage';
import { openCamera } from '@utils/helpers/openCamera';
import CameraImageComponent from '@assets/svgImages/cameraImage';

type CameraScreen = {
  navigation: any;
};

const CameraScreen:React.FC<CameraScreen> = () => {
  const [dateModalVisible, setDateModalVisible] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const { userData } = useSelector((state: RootReducer) => state.auth)
  const { userInfos } = useSelector((state: RootReducer) => state.userInformation)
const token = userData?.data?.token;
 
  const openPicker = async (value:string) => {
    const cropperCircleOverlay:boolean=true
    let text = 'Image uploaded' 
    openCamera(value, setDateModalVisible, cropperCircleOverlay, updateProfile,text);
       
  };

  const updateProfile=async ( image:ImageOrVideo)=>{

      // Create a new FormData object
    const userProfileForm:FormData = new FormData();
    const filename = image.path.substring(image.path.lastIndexOf('/') + 1);

    const selectedFile = {
      uri: image.path,
      name: filename, 
      type: image.mime, 
    };
    userProfileForm.append('ProfileImage', selectedFile);
    userProfileForm.append("Title", filename);
    userProfileForm.append("MimeType", image.mime);
    userProfileForm.append("UserId", userInfos?.id);
    const params:IprofileParams = {
      formData: userProfileForm,
      token : token
    }
    await dispatch(profileImage(params))
}

  return (
    <>
    <TouchableOpacity style={styles.cameraWrapper} onPress={() => setDateModalVisible(true)}>
          <CameraImageComponent/>
          </TouchableOpacity>
          <CameraModel
          dateModalVisible={dateModalVisible}
          setDateModalVisible={setDateModalVisible}
          openCamera={openPicker}
        />
        </>
  );
};

const styles = StyleSheet.create({
  cameraWrapper:  {
    borderWidth:1,
    borderColor:'rgba(214, 224, 243, 1)',
    ...tw`w-8 h-8 absolute bottom--1 right-0 bg-white rounded-full flex items-center justify-center`,
  }
})

export default CameraScreen;

