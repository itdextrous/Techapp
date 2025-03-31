import { Alert, PermissionsAndroid, Platform } from "react-native";
import { PERMISSIONS, RESULTS, check } from "react-native-permissions";

const permissions=async ()=>{
    const permission =
    Platform.OS === 'ios'
      ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
      : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION; // Adjust the permission for Android

  try {
    const result = await check(permission);
let permissionStatus;
    switch (result) {
      case RESULTS.UNAVAILABLE:
        permissionStatus= 'This feature is not available (on this device / in this context)'
        break;
      case RESULTS.DENIED:
        permissionStatus= 'The permission has not been requested / is denied but requestable';
        break;
      case RESULTS.LIMITED:
        permissionStatus= 'The permission is limited: some actions are possible';
        break;
      case RESULTS.GRANTED:
        permissionStatus= 'The permission is granted';
        break;
      case RESULTS.BLOCKED:
        permissionStatus= 'The permission is denied and not requestable anymore';
        break;
      default:
        permissionStatus= result
    }
return permissionStatus;
  } catch (error) {
    console.error('Error checking location permission:', error);
    return error;
  }
}

export const requestPermissions = async ()=> {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ]);

      const audioGranted =
        granted[PermissionsAndroid.PERMISSIONS.RECORD_AUDIO] === PermissionsAndroid.RESULTS.GRANTED;

      if (audioGranted) {
        // Permissions are granted, return true
        return true;
      } else {
        // Handle permission denial
        Alert.alert(
          "Permissions Required",
          "This app needs microphone and storage permissions to function properly.",
          [{ text: "OK" }]
        );
        return false; // Return false if permissions are denied
      }
    } catch (err) {
      console.warn(err);
      Alert.alert("Error", "An error occurred while requesting permissions.");
      return false; // Return false in case of an error
    }
  } else {
    // For iOS or other platforms, you can handle permissions accordingly
    console.log("Microphone permissions are automatically granted on iOS");
    return true; // Return true for iOS
  }
};

export default permissions;