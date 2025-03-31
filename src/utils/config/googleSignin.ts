import { GoogleSignin, User } from "@react-native-google-signin/google-signin";
import auth from '@react-native-firebase/auth';
import jsonData from '../../../android/app/google-services.json';
import log from "@services/log";

// get clirnt id from android json file
const client_id:string = jsonData.client[0].oauth_client[3].client_id;

// Create for google sign in
export const googleSignin = async()=>{
    //configration the google credentials
    try {
        GoogleSignin.configure({
            offlineAccess:true,
            webClientId:client_id,
            scopes:['profile', 'email']
        })
        await GoogleSignin.hasPlayServices();
        const userInfo:User = await GoogleSignin.signIn();
        const googleCredentials = auth.GoogleAuthProvider.credential(userInfo.idToken);
        auth().signInWithCredential(googleCredentials);
        return userInfo;
    } catch (error) { 
        log.error(error,'googleError');
    return null;
    }
}

// Create for google sign out
export const googleSignout = async()=>{
    //configration the google credentials
    try {
        GoogleSignin.configure({
            offlineAccess:true,
            webClientId:client_id,
            scopes:['profile', 'email']
        })
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signOut();
        return userInfo;
    } catch (error) { 
        log.error(error,'googleError');
    return null;
    }
}