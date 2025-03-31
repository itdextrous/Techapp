import { View, Text, StyleSheet, Pressable } from "react-native"
import Logo from "@components/common/Logo"
import tw from 'twrnc';

// Define the type for LoginHeader props
type LoginHeader = {
    navigation:any
}

const LoginHeader:React.FC<LoginHeader> = ({navigation}) => {
    return (
        <View style={styles.headerWrapper} >
            {/* Render the Logo component */}
            <Pressable onPress={()=>navigation.navigate('Login')}>
            <Logo />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    headerWrapper: {
        ...tw`w-full px-4 flex-row justify-between items-center`,
    },
})

export default LoginHeader;