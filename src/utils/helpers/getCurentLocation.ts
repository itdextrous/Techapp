import Geolocation from "@react-native-community/geolocation";
import { Alert, Linking, Platform } from "react-native";

const GetCurrentLocation = ():Promise<{latitude:number,longitude:number}> => {

    // const getLatLong = (cords)=>{

    // }
    // return promise to handle async operation
    return new Promise((resolve, reject) => {
       
        // get current possion of geo location api
        Geolocation.getCurrentPosition(
            (position: { coords: { latitude: number; longitude: number; }; }) => {
                const { latitude, longitude } = position.coords;
                resolve({ latitude, longitude });
            },
            // error callback when the error getting a positipn
            (error: { code: null; }) => {
                const errorCode = error.code || null;
                if (errorCode === 1 || errorCode === 2) {
                    Alert.alert(
                        'Permission Required',
                        'Please on device location.',
                        [
                            {
                                text: 'Open App Settings',
                                onPress: () =>
                                    Platform.OS == 'android' ?
                                        Linking.sendIntent("android.settings.LOCATION_SOURCE_SETTINGS") :
                                        Linking.openSettings(),
                            },
                            {
                                text: 'Cancel',
                                onPress: () => null,
                                style: 'cancel',
                            },
                        ]
                    );
                } else {
                    Alert.alert(
                        'Permission Required',
                        'Please enable location permission.',
                        [
                            {
                                text: 'Open App Settings',
                                onPress: () => Linking.openSettings(),
                            },
                            {
                                text: 'Cancel',
                                onPress: () => null,
                                style: 'cancel',
                            },
                        ]
                    );
                }
            },
            // options geo loation fequest
            { enableHighAccuracy: false, timeout: 25000 },
        );
    });
}

export default GetCurrentLocation;