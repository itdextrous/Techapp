import { fontPixel, heightPixel, pixelSizeHorizontal, pixelSizeVertical, widthPixel } from "@utils/helpers/customStyles";
import {  StyleSheet } from "react-native";
import tw from 'twrnc';

const styles = StyleSheet.create({
  container: {
    ...tw` bg-white flex-1`
  },
  wrapper: {
    ...tw`w-full mt-3 px-5 mb-5`
  },
  assetsContainer:{
    borderWidth:2,
    // backgroundColor:'#E9EDF4',
    paddingVertical:pixelSizeVertical(12),
    borderRadius:5,
    borderColor:'#F2F2FC',
    marginVertical:pixelSizeVertical(8),
  },
  assetsHeading:{
    fontSize:fontPixel(15),
    fontFamily:'NotoSans-Bold',
    color:"#334151"
  },
  assetsDetail:{
    flexDirection:'row',
    // justifyContent:'space-between',
    marginTop:pixelSizeVertical(4)
  },
  assetsWrapper:{
    flexDirection:'row',
    alignItems:'center',
    paddingHorizontal:pixelSizeHorizontal(12),

  },
  detailsWrapper:{
  // borderWidth:1,
  width:'90%'
  },
  assetsText:{
    fontSize:fontPixel(15),
    fontFamily:'NotoSans-Regular',
    color:'#334151',
  },
  optionWrapper:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginTop:pixelSizeVertical(5),
    borderBottomWidth:1,
    borderBottomColor:'rgba(230, 230, 250, 1)'
  },
  optionsList:{
    flexDirection:'row',
  },
  bottomLine:{
    backgroundColor:'rgba(133, 133, 242, 1)',
    height:3,
    position:'absolute',
    bottom:-2.2,
    borderRadius:100
},
  options:{
    marginRight:pixelSizeHorizontal(15),
    paddingHorizontal:pixelSizeHorizontal(5),
    justifyContent:'center'
  },
  optionText:{
    fontSize:fontPixel(17),
    textTransform:'uppercase',
    fontFamily:'NotoSans-SemiBold',
  },
  categoryWrapper:{
    marginVertical:pixelSizeVertical(20)
  },
  categoriesContainer:{
    flexDirection:'row',
    marginVertical:pixelSizeVertical(10),
    width:'80%'
  },
  detialKeys:{
    color:'#78797C',
    fontSize:fontPixel(15),
    fontFamily:'NotoSans-Regular',
  },
  detialValue:{
    color:'#363435',
    fontSize:fontPixel(15),
    width:'100%',
    fontFamily:'NotoSans-Regular',
  },
  textInput: {
    ...tw`flex-1`,
    fontSize:fontPixel(17),
    color:'#575962'
  },
  taskHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  backIconHandler: {
    width: '8%',
    alignItems: 'center',
    justifyContent: 'center',
    height:heightPixel(45),
  },
  taskNameWrapper: {
    width: '80%',
    alignItems: 'center'
  },
  title: {
    fontSize: fontPixel(17),
    fontWeight: '700'
  },
})


export default styles;