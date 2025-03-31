import { colors, fontPixel, pixelSizeHorizontal, pixelSizeVertical } from "@utils/helpers/customStyles";
import { StyleSheet } from "react-native";
import tw from 'twrnc';

const styles = StyleSheet.create({
    textInput:{
      ...tw ` flex-1 text-sm`,
      
    },
    images:{
      ...tw `w-5 h-5`
      },
      project:{
        ...tw ` mt-3 text-black`,
        fontSize:fontPixel(20),
        fontFamily:'NotoSans-SemiBold',
      },
      projectWrapper:{
        ...tw `mt-2` 
      },
      search: {
        ...tw`w-full mt-5 flex items-center flex-row justify-between`
      },
      projectContainer:{ 
        ...tw `border-b py-3 flex flex-row justify-between px-1`,
        borderColor:colors.grey 
    },
    projectName:{
         ...tw`text-black`,
        fontFamily:'NotoSans-SemiBold',
         fontSize:fontPixel(18)
    },
    value:{
      ...tw` mt-3`,
      fontSize:fontPixel(17),
      fontFamily:'NotoSans-Regular',
      color:"#A0A7B7"
    },
    projects:{
      paddingHorizontal: pixelSizeHorizontal(4),
      paddingVertical: pixelSizeVertical(6)
  },
    projectsWrapper:{
      flexDirection:'row',
      justifyContent:'space-between',
      paddingVertical:pixelSizeVertical(15),
      borderBottomWidth:1,    
      borderColor:"rgba(160, 167, 183, 1)"
  }
})

export default styles;