import { View, ScrollView } from "react-native"
import styles from "@screens/Login/styles";
import LoginForm from "@screens/Login/LoginForm";
import { screenHeight } from "@utils/helpers/customStyles";
import { Platform } from "react-native";

const LoginScreen = ({ navigation }: any) => {
  // Get the height of the window for ScrollView
  return (
    <ScrollView keyboardShouldPersistTaps={"handled"} bounces={false}>
      <View style={{ height: Platform.OS == 'android' ? screenHeight() - 100 : screenHeight() - 100 }}>
        {/* LoginHeader component with a custom title */}
        <View style={styles.formWrapper}>
          <LoginForm navigation={navigation} />
        </View>
      </View>
    </ScrollView>
  )
}

export default LoginScreen;