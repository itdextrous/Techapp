import React, { useState } from "react";
import DashboardHeader from "@components/layouts/DashboardHeader";
import { Dimensions, Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Pdf from 'react-native-pdf';
import ImageViewer from 'react-native-image-zoom-viewer';
import { heightPixel, pixelSizeHorizontal, pixelSizeVertical, widthPixel } from "@utils/helpers/customStyles";
import Video from 'react-native-video';
import Icons from "@utils/helpers/Icons";
import ConfirmationModal from "./ConfirmationModal";

const DisplayScreen = ({ navigation, route }: any) => {
    const [visible, setVisible]=useState<boolean>(false)
    const confirmModal = ()=>{
       setVisible(true) 
    }
    const deleteIcon = route.params.show ? 
    <Pressable style={{marginRight: pixelSizeHorizontal(5)}} onPress={confirmModal}>
        <Image source={(require("../../assets/images/delete.png"))} 
        style={{width:widthPixel(30), height: heightPixel(30)}}/>
        </Pressable>  : null;
    if (route.params.mimeType == 'pdf') {

        const source = { uri: route.params.item };
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <DashboardHeader navigation={navigation} route={route} deleteIcon={deleteIcon}/>
                <View style={[styles.container,{paddingTop:pixelSizeVertical(20)}]}>
                <ConfirmationModal visible={visible} setVisible={setVisible} onPress={route.params.onPress}/>
                    
                    <Pdf
                        trustAllCerts={false}
                        source={source}
                        onError={(error: any) => {
                            console.log(error);
                        }}
                        onPressLink={(uri: any) => {
                            console.log(`Link pressed: ${uri}`);
                        }}
                        style={{
                            flex: 1,
                            width: Dimensions.get('window').width,
                            height: Dimensions.get('window').height,
                        }} />
                </View>
            </View>
        )
    }
    else if (route.params.mimeType == 'image') {
        const images = [
            {
                url: route.params.item,
                // You can also use `source` for local images: `source: require('./path/to/image.jpg')`
            },
        ];
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <DashboardHeader navigation={navigation} route={route} deleteIcon={deleteIcon}/>
                <View style={[styles.container]}>
                <ConfirmationModal visible={visible} setVisible={setVisible} onPress={route.params.onPress}/>
                    <ImageViewer imageUrls={images} backgroundColor="white"
                        enableSwipeDown={false} // Disable swipe down
                        renderIndicator={() => <></>} // Hide image indicator:
                        style={styles.image}
                    />
                </View>
            </View>
        );
    } else if (route.params.mimeType == 'video') {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <DashboardHeader navigation={navigation} route={route} deleteIcon={deleteIcon}/>
                <View style={styles.container}>
                <ConfirmationModal visible={visible} setVisible={setVisible} onPress={route.params.onPress}/>
                    {
                        route.params.item ? (
                            <Video
                                source={{ uri: route.params.item }}
                                style={styles.video}
                                controls
                                resizeMode="contain"
                            />
                        ) : null}

                </View>
            </View>
        )
    } else if (route.params.mimeType == 'doc') {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <DashboardHeader navigation={navigation} route={route} deleteIcon={deleteIcon}/>
            <View style={styles.container}>
                <ConfirmationModal visible={visible} setVisible={setVisible} onPress={route.params.onPress}/>
                <ScrollView>
                    <Text style={styles.codeText}>{route.params.item}</Text>
                </ScrollView>
            </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',

    },
    image:{
        height:'60%',
        width:'100%', 
        alignSelf:'center', 
    },
    video: {
        width: '100%',
        height: '100%',
    },
    codeText: {
        fontFamily: 'monospace',
        padding: 10,
        backgroundColor: '#f5f5f5',
      },
});
export default DisplayScreen;