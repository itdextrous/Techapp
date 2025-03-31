import { View, Image,StyleSheet } from "react-native"
import tw from 'twrnc';

const Logo = () => {
    return (
        <View style={styles.container}>
            <Image source={require('@assets/images/logo.png')}
                style={styles.image} resizeMode='contain'
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        ...tw`w-23 h-20`,
    },
   image: {
    ...tw`h-full w-full`,
   }
  });
export default Logo;