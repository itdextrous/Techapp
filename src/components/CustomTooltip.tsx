import { Pressable, Text, View } from "react-native";
import Tooltip from "react-native-walkthrough-tooltip";
import CustomButton from "./common/Button";
import { heightPixel, widthPixel } from "@utils/helpers/customStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

type CustomTooltip = {
    component: any,
    state: any,
    setState: any,
    title:string,
    buttonTitle:string,
    tooltipStyle?:any,
    tooltipHandler:()=>void
}
const CustomTooltip: React.FC<CustomTooltip> = ({
    component,
    state,
    title,
    buttonTitle,
    tooltipStyle,
    tooltipHandler
}) => {
    const[visibility, setVisibility]=useState<boolean|null>(null)
    useEffect(()=>{
        getVisible()
    },[])
    const getVisible = async()=>{
        const getVisible:any = await AsyncStorage.getItem('tooltip')
        const parse = JSON.parse(getVisible)
        setVisibility(parse)
    }
    return (
        <Tooltip
            tooltipStyle={[tooltipStyle,{ bottom: 15, width: '40%', height: 100 }]}
            childrenWrapperStyle={{ display: 'none' }}
            isVisible={visibility == null?state:visibility}
            content={
                <View>
                    <Text>{title}</Text>
                    <CustomButton title={buttonTitle} mode='text'
                        customButtom={{ height: 28, width: 70,marginTop: 5, alignSelf: 'center' }}
                        buttonTitle={{
                            height: heightPixel(25),
                            lineHeight: 14
                        }}
                        onPress={tooltipHandler} />
                </View>}
            placement="bottom"
            onClose={() => null}
        >
            {component}
        </Tooltip>
    )
}

export default CustomTooltip;