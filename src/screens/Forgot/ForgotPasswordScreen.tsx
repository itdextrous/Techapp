import { View, ScrollView } from "react-native"
import { screenHeight } from "@utils/helpers/customStyles";
import { Platform } from "react-native";
import ForgotForm from "@screens/Forgot/ForgotForm";
import styles from "./styles";

const ForgotScreen = () => {
  // Get the height of the window for ScrollView
  return (
    <ScrollView keyboardShouldPersistTaps={"handled"} bounces={false}>
     
      <View style={{ height: Platform.OS == 'android' ? screenHeight() - 100 : screenHeight() - 100 }}>
        {/* LoginHeader component with a custom title */}
        <View style={styles.formWrapper}>
          <ForgotForm />
        </View>
      </View>
    </ScrollView>
  )
}

export default ForgotScreen;