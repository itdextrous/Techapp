import DropdownItems from "@components/Dropdown"
import { heightPixel, pixelSizeHorizontal, widthPixel } from "@utils/helpers/customStyles";
import React, { useRef, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import styles from "./styles";

type Labels = {
    data:any
    value:string | undefined
    setValue:any 
    color:string | undefined,
    setColor:any,
    placeholder?:string,
    dropdown?:any
    label?:string,
    defaultProfileImage?:string | null
    taskId?:number | undefined,
    textColor:string
}

const Lables:React.FC<Labels> = ({
    data,
    value,
    setValue,
    color,
    setColor,
    placeholder,
    dropdown,
    label,
    defaultProfileImage,
    taskId,
    textColor
})=>{
    const [dropdownFocus, setDropdownFocus]= useState<string>('')
    const status = ['Status','Priority']
    const dropdownRef = useRef<any>();
    return(
        <View style={{width:label=='Status' ? "50%" :  label == 'Priority' ?
            '50%': 
        label=='Assignee'?'60%': '30%', marginTop:10, justifyContent:'space-between' }}>
        <Text style={{color:'#A0A7B7', marginBottom:5,fontFamily:'NotoSans-Regular'}}>{label}</Text>
        <View style={{flexDirection:'row'}}>
            <DropdownItems 
                data={data} 
                dropdownRef={dropdownRef}
                value={value} 
                setValue={(value: any)=>setValue(placeholder, value)} 
                placeholder={placeholder} 
                dropDownStyle={[dropdown,{
                    backgroundColor:color
                }]}
                selectedTextStyle={{
                    textAlign:'center',
                    color:textColor,
                    fontFamily:'NotoSans-Regular'
                }}
                leftIcon={label=='Assignee'&&true}
                icon={false}
                search={true}
                placeholderStyle={{
                    textAlign:'center'
                }}
                defaultProfileImage={defaultProfileImage}
                setColor={(value: string)=>setColor(placeholder, value)} 
                label={label}
                taskId={taskId}
            />
            { (label === 'Status' || label === 'Priority') && (
                <Pressable
                    style={[
                    styles.selectedText,
                    {
                        marginLeft: pixelSizeHorizontal(8),
                        marginRight: pixelSizeHorizontal(12),
                    },
                    ]}
                    onPress={() => dropdownRef.current?.open()}
                >
                    <Image
                    source={require('@assets/images/drop-frame.png')}
                    style={{
                        resizeMode: 'contain',
                        width: widthPixel(30),
                        height: heightPixel(40),
                    }}
                    />
                </Pressable>
            )}

            </View>
        </View>
        
    )
}

export default Lables;