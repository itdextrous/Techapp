import { fontPixel, heightPixel, pixelSizeHorizontal, pixelSizeVertical, widthPixel } from "@utils/helpers/customStyles";
import { Platform, StyleSheet } from "react-native";
import tw from 'twrnc';

const styles = StyleSheet.create({
   container: {
      ...tw`items-center bg-white flex-1`,
   },
   wrapper: {
      ...tw`w-full px-3 mb-5`,
   },
   taskHeader: {
      flexDirection: 'row',
      width: '92%',
      height: heightPixel(50),
      alignItems: 'center',
      marginTop: pixelSizeVertical(10)
   },
   backIconHandler: {
      width: '15%',
      height: '70%',
      // borderWidth:1,
      alignItems: 'center',
      justifyContent: 'center',
   },
   taskNameWrapper: {
      width: '70%',
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: pixelSizeHorizontal(15),
   },
   focusTaskNameWrapper: {
      backgroundColor: 'white',
      height: heightPixel(50),
      borderColor: '#E9EDF4',
      width: '100%',
      left: 20,
      borderRadius: 6,
   },
   titleInput: {
      height: heightPixel(30),
      textAlign: 'center',
      fontSize: fontPixel(19),
      fontFamily: 'NotoSans-Bold',
      color: '#000000'
   },
   focusTitleInput: {
      fontSize: fontPixel(17),
      height: heightPixel(50),
      width: '85%',
      fontFamily: 'NotoSans-Regular',
   },
   title: {
      fontSize: fontPixel(17),
      fontWeight: '700'
   },
   optionWrapper: {
      width: '100%',
      alignSelf: 'center',
      marginTop: pixelSizeHorizontal(15),
      paddingHorizontal: pixelSizeHorizontal(10),
      flexDirection: 'row',
   },
   options: {
      flexDirection: 'row',
      borderRightColor: '#9E9E9E',
      alignItems: 'center',
   },
   optionText: {
      fontFamily: 'NotoSans-Regular',
      fontSize: Platform.OS == 'android' ? fontPixel(16) : fontPixel(14),
      marginLeft: Platform.OS == 'android' ? pixelSizeHorizontal(10) : pixelSizeHorizontal(10),
      color: "rgba(158, 158, 158, 1)"
   },
   detailWrapper: {
      marginTop: pixelSizeVertical(7),
      width: '100%',
      borderColor: '#DCDCDC',
      height: 200,
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: pixelSizeHorizontal(5),
      paddingVertical: pixelSizeVertical(1),
   },
   assigneeWrapper: {
      position: 'absolute',
      width: '77%',
      height: '88%',
      justifyContent: 'flex-end',
      right: 0
   },
   assignee: {
      fontSize: 16,
      fontWeight: '600'
   },
   labelWrapper: {
      ...tw`mt-1`,
      flexDirection: 'row',
      flexWrap: 'wrap',
      zIndex:5
   },
   notesContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 5,
      width: '100%',
      alignItems: 'center'
   },
   notesTitle: {
      fontSize: fontPixel(17),
      color: "#171C30",
      fontFamily: 'NotoSans-SemiBold'
   },
   chatContainer: {
      borderWidth: 1,
      marginVertical: 10,
      borderRadius: 8,
      width: '100%',
      borderColor: '#E6E6FA'
   },
   chats: {
      width: '72%',
      alignSelf: 'center',
   },
   chatTimer: {
      width: '84%',
      justifyContent: 'space-between',
      flexDirection: 'row'
   },
   notesWrapper: {
      paddingVertical: 12,
      paddingHorizontal: 5,
      borderBottomColor: "#E6E6FA"
   },
   centeredView: {
      // flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: pixelSizeVertical(25),
   },
   modalView: {
      width: '94%',
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 15,
      marginTop: Platform.OS == 'android' ? pixelSizeVertical(90) : pixelSizeVertical(110),
      alignSelf: 'center',
      shadowColor: '#000',
      shadowOffset: {
         width: 0,
         height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      height: Platform.OS == 'android' ? heightPixel(700) : heightPixel(650),
      zIndex: 999,
   },
   button: {
      borderRadius: 20,
      padding: 10,
   },
   saveButton: {
      borderRadius: 30,
      borderColor: '#8585F2',
      width: widthPixel(38),
      height:Platform.OS =='android'?heightPixel(40): heightPixel(38),
      borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
   },
   saveButtonTitle: {
      fontSize: fontPixel(16),
   },
   accordianContainer: {
      ...tw`mt-5 py-1`,
      borderRadius: 5,
   },
   attachmentContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
   },
   attachmentWrapper: {
      flexDirection: 'row',
      height: '100%',
      alignItems: 'center',
   },
   customButton: {
      ...tw`px-0`,
      borderRadius: 8,
      borderColor: '#8585F2',
      height: heightPixel(32),
      width: widthPixel(80),
      borderWidth: 1,
   },
   buttonTitle: {
      alignSelf: 'center',
      fontSize: fontPixel(17),
      color: '#8686f2'
   },
   attachmentView: {
      width: '100%',
      maxHeight: heightPixel(400),
      borderRadius: 8,
   },
   uploadWrapper: {
      paddingBottom: 10,
      flexDirection: 'row',
      flexWrap: 'wrap',
      borderRadius: 8,
      justifyContent: 'flex-start'
   },
   uploadView: {
      marginTop: pixelSizeVertical(15),
      borderWidth: 1.5,
      borderColor: '#B7B7B7',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#EBEDF3',
      borderStyle: 'dotted',
      width: Platform.OS == 'android' ? widthPixel(118) : widthPixel(105),
      height: Platform.OS == 'android' ? heightPixel(125) : heightPixel(115),
      borderRadius: 5,
   },
   attachments: {
      marginTop: pixelSizeVertical(15),
      borderWidth: 1,
      borderColor: '#B7B7B7',
      alignItems: 'center',
      justifyContent: 'center',
      width: Platform.OS == 'android' ? widthPixel(118) : widthPixel(105),
      height: Platform.OS == 'android' ? heightPixel(125) : heightPixel(115),
      borderRadius: 5
   },
   timeWrapper: {
      marginTop: 10,
      flexDirection: 'row',
      flexWrap: 'wrap',
      paddingHorizontal: 8,
      justifyContent: 'center'
   },
   timings: {
      borderWidth: 1,
      width: '22%',
      paddingVertical: 3,
      alignItems: 'center',
      borderColor: '#d6e0f3',
      borderRadius: 5,
      marginHorizontal: 3,
      marginVertical: 5,
   },
   timeSave: {
      ...tw`px-0`,
      borderRadius: 5,
      marginTop: pixelSizeHorizontal(10),
      borderColor: '#8585F2',
      height: heightPixel(35),
      width: '95%',
      borderWidth: 1,
      alignItems: 'center'
   },
   timeTitle: {
      fontSize: fontPixel(18),
   },
   customLabelWrapper: {
      justifyContent: 'flex-end',
      width: widthPixel(120),
      marginRight: pixelSizeVertical(10),
      position: 'relative',
      zIndex: 99
   },
   selectedText: {
      height: heightPixel(37),
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 5,
      borderColor: '#8585F2'
   },
   customDropdownWrapper: {
      alignItems: 'center',
      position: 'absolute',
      borderRadius:5,
      left:0,
      width: widthPixel(150),
      top: pixelSizeVertical(72),
      borderWidth: 1,
      borderColor: 'rgba(0,0,0,0.1)',
      zIndex: 100,
      backgroundColor: 'white',
   },
   checkLableWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      paddingRight: 8,
   },
   dropdownText: {
      height: heightPixel(30),
      borderRadius: 5,
      width: '70%',
      justifyContent: 'center',
      alignItems: 'center',
   },
   dropdownView: {
      width: widthPixel(330),
      marginTop: pixelSizeVertical(32),
      flexDirection: 'row',
      alignItems:'center'
   },
   dropdownViewText: {
      height: heightPixel(37),
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 2,
      borderRadius: 5,
      marginRight: pixelSizeVertical(10),
   },
   toastStyle: {
      width: widthPixel(200),
      marginTop:pixelSizeVertical(50),
      color:'#8585F2',
      textAlign:'center',
      borderWidth:1,
      borderColor:'#8585F2',
      borderLeftWidth:1,
      fontFamily:'NotoSans-SemiBold',
      fontSize:fontPixel(17),
      backgroundColor:'#F2F2FC'
   },
   audioWrapper:{
      flexDirection: 'row',
      alignItems: 'center',
    },
    textEditorWrap:{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end'
    },
    micWrapper:{
      // borderTopWidth: 1,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent:'space-between',
      width:widthPixel(90),
      // paddingHorizontal: pixelSizeHorizontal(10),
      // paddingTop: pixelSizeVertical(20),
      borderColor: 'rgba(242, 242, 252, 1)',
    },
    stopButton:{
      width: widthPixel(16),
      height: heightPixel(16),
      backgroundColor: '#FF0707',
      borderRadius: 3
    },
})


export default styles;