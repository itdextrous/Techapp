import { StyleSheet, View, Pressable, Image } from "react-native"
import { useState } from "react"
import { EyeIcons } from "@enums/login"
import tw from 'twrnc';
import { TextInput } from "react-native-paper";
import { fontPixel, heightPixel } from "@utils/helpers/customStyles";

// Define the type for InputText props
type InputText = {
    placeholder:string,
    image?:React.JSX.Element,
    secureTextEntry?:boolean,
    onChangeText?: (text: string) => void,
    value?:string,
    textInput?:any,
    inputWrapper?:any
    placeholderColor?:string,
    editable?:boolean,
    autoFocus?:boolean,
    onFocus?:any,
    onBlur?:any
}

// Define the InputText component
const InputText:React.FC<InputText> = ({placeholder,
  placeholderColor,
  image,
  secureTextEntry,
  onChangeText,
  inputWrapper,
  value,
  textInput,
  editable,
  autoFocus,
  onFocus,
  onBlur
})=>{
    const [passwordVisibility, setPasswordVisibility] = useState<boolean | undefined>(secureTextEntry);
    const [rightImage, setRightImage] = useState<any>(require("../../assets/images/eye-close.png"));

    // Function to handle toggling password visibility
    const handlePasswordVisibility = () => {
        if (rightImage === EyeIcons.Secure) {
          setRightImage(require("../../assets/images/eye-open.png"));
          setPasswordVisibility(!passwordVisibility);
        } else if (rightImage === EyeIcons.InSecure) {
          setRightImage(require("../../assets/images/eye-close.png"));
          setPasswordVisibility(!passwordVisibility);
        }
      };
    return(
        <View style={[styles.inputWrapper, inputWrapper]}>
          {image}
         <TextInput 
         underlineColor="transparent"
         activeUnderlineColor="transparent"
        placeholder={placeholder} 
        style={[styles.textInput,textInput]} 
        secureTextEntry={passwordVisibility}
        onChangeText={onChangeText}
        value={value}
        caretHidden={false}
        selectionColor="#000"
        cursorColor="#000"
        selectTextOnFocus={false}
        placeholderTextColor={placeholderColor}
        editable={editable}
        autoFocus={autoFocus}
        onFocus={onFocus}
        onBlur={onBlur}
        />
        {/* Conditionally render password visibility toggle icon */}
          {placeholder == "Password"  && (
            <Pressable onPress={handlePasswordVisibility}>
              <Image source={rightImage} style={styles.images}/>
            </Pressable>
          )} 
        </View>
    )
}

const styles = StyleSheet.create({
    inputWrapper:{
        ...tw`border h-10 mt-4 rounded-lg justify-center flex-row items-center`,
        borderColor:'#d6e0f3',
    },
    textInput:{
      ...tw `flex-1 bg-white justify-center `,
      height:heightPixel(30),
      fontFamily:'NotoSans-Regular',
    },
    images:{
      ...tw `w-5 h-5`
      }
})

export default InputText