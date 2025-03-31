import { heightPixel, widthPixel } from "@utils/helpers/customStyles";
import { Pressable, StyleSheet, Text, View } from "react-native"
import tw from 'twrnc';

// Define the type for Button props
type CustomButton = {
    title: string,
    customButtom?: any,
    buttonTitle?: any,
    image?: any,
    onPress: () => void,
    isLoading?: boolean
    mode?: "text" | "outlined" | "contained" | "elevated" | "contained-tonal" | undefined
}

const CustomButton: React.FC<CustomButton> = ({
    title, customButtom, buttonTitle, image, onPress, isLoading
}) => {
    return (
        <Pressable style={[styles.buttonWrapper, customButtom]}
            onPress={onPress}>
            <View style={styles.button}>
                {image &&
                    <View style={styles.image}>{image}</View>
                }
                <Text style={[styles.buttonTitle, buttonTitle]}>{title}</Text>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    buttonWrapper: {
        ...tw`bg-white`,
        alignItems: 'center',
        justifyContent: 'center',
        width: widthPixel(120),
        height: heightPixel(50)
    },
    button: {
        flexDirection: 'row',
    },
    image: {
        width: widthPixel(35),
    },
    buttonTitle: {
        fontFamily:'NotoSans-Regular',
        color: '#8686f2',
        ...tw`text-sm`,
    }
})

export default CustomButton;