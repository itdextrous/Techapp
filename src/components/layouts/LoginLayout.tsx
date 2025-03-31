import LinearGradient from "react-native-linear-gradient";
import styles from "@screens/Login/styles";
import LoginHeader from "./LoginHeader";
import { View } from "react-native";
import Loader from "@components/common/Loader";
import { useSelector } from "react-redux";
import { RootReducer } from "@redux/store";

type ReducerKeys = keyof RootReducer;
const LoginLayout = (Component: any, key:ReducerKeys) => {
    return (props: any) =>{ 
        const { isLoading } = useSelector((state: RootReducer) => state[key]); 
        return(
        <LinearGradient
            colors={['#877CF5', '#6C6CF7', '#69ACFD']}
            start={{ x: 1.2, y: 0 }}
            end={{ x: 0, y: 0.2 }}
            locations={[0, 0.1, 1]}
            style={styles.container} // Adjust as needed
        >
            {isLoading &&
                <Loader
                    height='100%' />
            }
            <LoginHeader navigation={props.navigation} />
            <View style={styles.formWrapper}>
                <Component {...props} />
            </View>
        </LinearGradient >
    )};
}

export default LoginLayout;