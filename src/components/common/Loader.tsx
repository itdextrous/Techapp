import { colors, widthPixel } from "@utils/helpers/customStyles";
import { DimensionValue, Image, StyleSheet, Text, View } from "react-native";
import { ActivityIndicator, MD2Colors } from "react-native-paper";

type ILoader = {
    top?:DimensionValue | undefined,
    height?:DimensionValue | undefined,
    background?:string | undefined
}

const Loader:React.FC<ILoader> = ({top,height,background})=>{
    return(
        <View style={[style.wrapper,{
            top:top,
            height:height,
            backgroundColor :background !==undefined?background:'rgba(0,0,0,0.2)'

        }]}>
          
        <ActivityIndicator animating={true} color={colors.theme} />
        </View>
    )
}

export default Loader;


export const CustomLoader:React.FC<ILoader> = ({top,height})=>{
    return(
        <View style={[style.wrapper,{
            top:top,
            height:height,
        }]}>
            <View style={{
                width:'80%',
                flexDirection:'row',
                height:100,
                backgroundColor:'rgba(255,255,255, 1);',
                alignItems:'center',
                borderRadius:8,
                justifyContent:'center',
                paddingHorizontal:10
            }}>
                {/* <View style={{
                    width:25,
                    height:25,
                    marginRight:10
                }}>
            <Image source={require('@assets/images/appIcon.png')} style={{
                width:'100%',
                height:'100%',
            }}
            resizeMode="contain"/>
            </View> */}
            <ActivityIndicator animating={true} color={colors.theme} />
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    wrapper:{ 
        position:'absolute',
        width:'100%', 
        flexDirection:'row',
         backgroundColor:'rgba(0,0,0,0.2)',
         alignSelf:'center',
         zIndex:99,
         justifyContent:'center', 
         alignItems:'center',
    }
})