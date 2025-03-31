import { colors, fontPixel, heightPixel, pixelSizeHorizontal, pixelSizeVertical, widthPixel } from "@utils/helpers/customStyles";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    notificationContainer:{
        paddingVertical:pixelSizeVertical(10),
        flexDirection:'row',
    },
    text:{
        fontSize:fontPixel(16),
        lineHeight:20
    },
    codeNumber:{
        fontSize:fontPixel(15),
    },
    messageText:{
        fontWeight:'700',
        color:'#000'
    },
    imageWrapper:{
        backgroundColor:"white",
        borderWidth:1, 
        borderColor:'rgba(230, 230, 250, 1)',
      },
      customButton:{
        borderWidth:1,
        width:widthPixel(100),
        height:heightPixel(40),
        borderRadius:5,
        alignSelf:'center',
        borderColor:'#8686f2'
      },
      taskHeader: {
        flexDirection: 'row',
        width: '92%',
        height: heightPixel(40),
        alignItems: 'center',
        marginTop: pixelSizeVertical(10)
     },
     backIconHandler: {
        width: '15%',
        height:'70%',
        justifyContent: 'center',
     },
     taskNameWrapper: {
        width: '70%',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: pixelSizeHorizontal(15),
     },
     titleInput:{
        height:heightPixel(30), 
        textAlign:'center',
        fontSize:fontPixel(19),
        fontFamily:'NotoSans-Medium',
        color:'#000000'
     },
})

export default styles;