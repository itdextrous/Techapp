import CameraScreen from "@components/Camera";
import { RootReducer } from "@redux/store";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native"
import { Avatar, MD2Colors } from "react-native-paper";
import {  useSelector } from "react-redux";
import tw from 'twrnc';

type ProfileImage = {
    setModalVisible?: (value: boolean) => void | null,
    modalVisible?: boolean,
    imageWrapper?: any,
    size: number,
    screenName?: string,
    textSize?:number
}

const ProfileImage: React.FC<ProfileImage> = ({ textSize,setModalVisible, modalVisible, imageWrapper, size, screenName }) => {
    const { userData } = useSelector((state: any) => state.auth);
    const { userInfos } = useSelector((state: RootReducer) => state.userInformation);
    const { profileData, isLoading } = useSelector((state: RootReducer) => state.profileImage);
    const profileImage = profileData?.data?.value?.profileImageUrl
    const profileHandler = () => {
        setModalVisible == null ? null : setModalVisible(!modalVisible)
    }
    return (
        <Pressable style={[styles.imageWrapper, imageWrapper]}
            onPress={profileHandler}
        >
            {isLoading ?
                <ActivityIndicator animating={true} color={MD2Colors.red800} />
                :
                <>
                    {profileImage || userData?.data?.profileImage ?
                        <Avatar.Image size={size} source={{ uri: profileImage ? profileImage : userData?.data?.profileImage }}
                            style={{ backgroundColor: 'white',}} />
                        :
                        <View style={{
                            height:'100%',
                            width:"100%",
                            alignItems:'center',
                            justifyContent:'center',
                            backgroundColor:'white',
                            borderRadius:100
                        }}>
                            <Text style={{
                                fontSize:textSize
                            }}>{userInfos?.firstName.substring(0, 1)}</Text>
                        </View>
                    }
                </>
            }
            {screenName == "Profile" &&
                <CameraScreen navigation={undefined} />
            }
        </Pressable>
    )
}

const styles = StyleSheet.create({
    imageWrapper: {
        ...tw`border rounded-full justify-center items-center w-8 h-8`,
        borderColor: 'rgba(214,224,243, 1)',
    },
})
export default ProfileImage;

