import { colors, fontPixel, heightPixel, pixelSizeVertical, widthPixel } from "@utils/helpers/customStyles";
import { Platform, StyleSheet } from "react-native";
import tw from 'twrnc';

const styles = StyleSheet.create({
  wrapper: {
    ...tw`flex items-center bg-white flex-1 `,
  },
  searchWrapper: {
    ...tw` w-full px-5 `,
  },
  search: {
    ...tw`w-full mt-5 flex items-center flex-row justify-between`
  },
  textInput: {
    ...tw` flex-1`,
    fontSize:fontPixel(17),
    color:'#575962'
  },
  tasksWrapper: {
    ...tw`my-3`,
  },
  projectContainer: {
    ...tw`border mb-2 flex flex-row justify-between pr-1`,
    borderRadius: 6,
    borderColor: "rgba(242, 242, 252, 1)",
  },
  projectName: {
    ...tw`w-23`,
    color: '#334151',
    fontFamily:'NotoSans-Regular',
    fontSize: fontPixel(17)
  },
  value: {
    ...tw` mt-3`,
    fontFamily:'NotoSans-Regular',
    fontSize: fontPixel(17),
    color: '#334151'
  },
  container: {
    backgroundColor: 'white',
    height: heightPixel(45),
    marginTop: pixelSizeVertical(20),
  },
  customSideColor: {
    ...tw` items-center flex-row justify-between`,
    borderTopLeftRadius:6,
    borderBottomLeftRadius:6,
    width: '1.5%',
  },
  imageWrapper:{
    backgroundColor:"white",
    borderWidth:1, 
    borderColor:'rgba(230, 230, 250, 1)'
  },
  card: {
    ...tw`w-full items-center flex-row justify-evenly pr-2 py-2`,
  },
  rattings:{
    ...tw`text-white mr-1 px-1`,
    borderRadius:5,
    alignItems:'center',
    justifyContent:'center',
  },
  rattingText:{
    ...tw`text-white`,
    fontSize:fontPixel(14),
    fontFamily:'NotoSans-Regular',
  },
  name:{
    ...tw`flex-row justify-between`,
},
title:{
  fontSize:fontPixel(17),
  textTransform:'uppercase',
  fontFamily:'NotoSans-SemiBold',
},
bottomLine:{
  height:Platform.OS == 'android'? heightPixel(4):heightPixel(1),
  position:'relative',
  bottom:1,
  zIndex:999,
  borderRadius:10,
  width: '100%',
},
boderLine:{
  height:Platform.OS == 'android'? heightPixel(1):heightPixel(0),
  position:'absolute',
  bottom:3,
  zIndex:-999,
  borderRadius:100,
  width:'100%',
},
customDropdownWrapper: {
  alignItems: 'flex-start',
  position: 'absolute',
  width: widthPixel(80),
  height:heightPixel(100),
  right:0,
  top: pixelSizeVertical(30),
  borderWidth: 1,
  backgroundColor: 'white'
},
checkLableWrapper: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  paddingRight: 8
},
dropdownText: {
  height: heightPixel(30),
  borderRadius: 5,
  width: '70%',
  justifyContent: 'center',
  alignItems: 'center',
},
})

export default styles;