import { Alert, DimensionValue, Linking } from "react-native";
import ImagePicker, {ImageOrVideo} from 'react-native-image-crop-picker';
import { PERMISSIONS, RESULTS, check, request } from "react-native-permissions";
import DocumentPicker from 'react-native-document-picker';
import Toast from "react-native-toast-message";
import { widthPixel } from "./customStyles";

const showToast = (width:DimensionValue,text:string | undefined) => {
  Toast.show({
    type: 'customToast',
    text2: text,
    position: 'bottom',
    props: { width,
       backgroundColor:'#323232'
     },
  });
};
const showToast2 = (width:DimensionValue,text:string | undefined,visibilityTime:number,autoHide = true, ) => {
  Toast.show({
    type: 'customToast',
    text2: text,
    position: 'bottom',
    autoHide: autoHide, // Dynamically control the auto-hide
    visibilityTime: autoHide ? visibilityTime : 0, 
    props: { width,
       backgroundColor:'#323232'
     },
  });
};

const requestCameraPermission = async () => {
    let permission = PERMISSIONS.ANDROID.CAMERA;
    const result = await check(permission);
    if (result === RESULTS.GRANTED) {
      // Camera permission already granted, you can proceed with image picker
      return true;
    } else {
      // Camera permission not granted, request permission
      const requestResult = await request(permission, {
        title: 'Camera Permission',
        message: 'We need your permission to use the camera for taking photos.',
        buttonPositive: 'OK',
        buttonNegative: 'Cancel',
      });
      if (requestResult === RESULTS.GRANTED) {
        // Permission granted, you can proceed with image picker
        // openCamera('camera');
        return true
      } else {
        // Permission denied, handle accordingly
        Alert.alert(
          'Camera Permission Required',
          'Please enable camera permission in your device settings to take photos.',
          [
            {
              text: 'Open Settings',
              onPress: () => Linking.openSettings(),
            },
            {
              text: 'Cancel',
              style: 'cancel',
            },
          ],
        );
      }
    }
  };
  
  export const openCamera = async (
    value: string,
    setModalVisible?: (visible: boolean) => void,
    cropperCircleOverlay?:boolean,
    updateProfile?: (image: ImageOrVideo) => void,
    text?:string,
    updateAttachment?:(image: ImageOrVideo) => void,
) => {
    if (value === 'camera') {
      let opened = await requestCameraPermission();
      if (opened) {
        ImagePicker.openCamera({
          cropping: true,
          hideBottomControls: true,
          freeStyleCropEnabled: true,
          compressImageQuality: 1,
          cropperCircleOverlay: cropperCircleOverlay
        })
          .then((image: ImageOrVideo) => {
            let cameraImage:any = cropperCircleOverlay ? image : [image]
            showToast2(widthPixel(350), text,10000);
            updateProfile && updateProfile(cameraImage); 
            !updateProfile && showToast(widthPixel(350),text);
            setModalVisible && setModalVisible(false);
          })
          .catch(error => {
            console.error('ImagePicker Error: ', error);
            setModalVisible && setModalVisible(false);
          });
      }
    } else {
      ImagePicker.openPicker({
        // cropping: true,
        hideBottomControls: true,
        freeStyleCropEnabled: true,
        multiple:text == "Uploading attachment..." ? true:false, 
        mediaType: 'any',
        compressImageQuality: 1,
        cropperCircleOverlay: cropperCircleOverlay
      })
        .then((image: ImageOrVideo[] | any) => {
          showToast2(widthPixel(350),text,10000);
          updateProfile && updateProfile(image);
          !updateProfile && showToast(widthPixel(350),text);
          setModalVisible && setModalVisible(false);
        })
        .catch(error => {
          console.error('ImagePicker Error: ', error);
          setModalVisible && setModalVisible(false);
        });
    }
  };

  export const docPicker = async(setModalVisible:any,updateAttachmentDoc?:(doc: any) => void, text?:string|undefined)=>{

    try {
        const result = await DocumentPicker.pickMultiple({
            type:[DocumentPicker.types.allFiles]
        });
        if(result){
          showToast(widthPixel(350),text);
          updateAttachmentDoc && updateAttachmentDoc(result)
        }
        setModalVisible(false);
    } catch (error) {
        console.log(error, 'pppp')
    }
}