import { Formik } from "formik";
import { View, Text, Image, Alert } from "react-native";
import CustomButton from "@components/common/Button";
import InputText from "@components/common/InputText";
import * as Yup from "yup";
import styles from "@screens/Login/styles";
import { IGoogleLogin, ILogin } from "@interfaces/login";
import { useDispatch, useSelector } from "react-redux";
import tw from 'twrnc';
import { login, googleLogin } from "@redux/authSlice";
import { AppDispatch, RootReducer } from "@redux/store";
import log from "@services/log";
import { googleSignin, googleSignout } from "@utils/config/googleSignin";
import GoogleComponent from "@assets/svgImages/google";
import { colors, fontPixel, pixelSizeHorizontal } from "@utils/helpers/customStyles";
import { user } from "@redux/userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { userPermissions } from "@redux/permissionSlice";

// Define the type for form values
type MyFormValues = {
  email: string;
  password: string;
};

// Define validation schema using Yup
const SigninSchema = Yup.object().shape({
  email: Yup.string()
    .email("Not a valid email")
    .required("Required"),
  password: Yup.string().required("Required"),
});
type LoginForm = {
  navigation: any
}
// Define the LoginForm component
const LoginForm: React.FC<LoginForm> = ({ navigation }) => {
  const dispatch = useDispatch<AppDispatch>();
  
  // Define images for email and password fields
  const emailImage =
    <Image source={require('@assets/images/inbox.png')} style={styles.images} />
  const passwordImage =
    <Image source={require('@assets/images/password.png')} style={styles.images} />

  // Define initial form values
  const initialValues: MyFormValues = { email: "", password: "" };

  const HorizontalLineView = () =>
    <View style={styles.horizonalLine} />
  // reset errors when changes in any field
  const ChangeHandle = (e: any) => {
    log.error(e);
  };

  /**
 * Handles the submission of the login form.
 * @param values The form values containing email and password.
 */
  const submitHandler = async (values: MyFormValues) => {
    // Create a payload object containing the email and password
      const payload: ILogin = {
        email: values.email,
        password: values.password
      }
      const response: any = await dispatch(login(payload))
      if (response?.payload?.isSuccess == false) {
        const errorMessage = response?.payload?.message?.userMessage
        Alert.alert(errorMessage);
      }
    }

  // Creted for google sign in
  const signinGoogle = async () => {
      const response = await googleSignin();
      if (response) {
        const payload: IGoogleLogin = {
          // email:response?.user?.email,
          // isVerified:true,
          // givenName:response?.user?.givenName,
          // familyName:response?.user?.familyName,
          // displayName:response?.user?.name,
          email: 'arieldev@prexus.com.au',
          isVerified: true,
          givenName: 'jaspreet',
          familyName: 'jaspreet',
          displayName: 'jaspreet',
        }
        const googleResponse: any = await dispatch(googleLogin(payload))
        if (googleResponse?.payload?.isSuccess == false) {
          const errorMessage = googleResponse?.payload?.message?.userMessage
          await googleSignout()
          Alert.alert(errorMessage);
        }
        setDecodeData(googleResponse)
    } 

  }


  const setDecodeData = async (userData:any) => {
    const token: string | null | undefined = userData?.payload?.data?.token;
    const response = await dispatch(user(token))
    
    AsyncStorage.setItem('token', JSON.stringify(token))
    await dispatch(userPermissions())
}
  return (
    <View style={styles.wrapper}>

      <Text style={styles.heading}>trakk login</Text>
      <CustomButton title="Continue with Google"
        customButtom={styles.buttonWrapper}
        image={<GoogleComponent />}
        onPress={() => signinGoogle()} />

      <View style={styles.textWrapper}>
        <HorizontalLineView />
        <Text style={styles.title}>OR LOGIN WITH EMAIL</Text>
        <HorizontalLineView />
      </View>
      {/* Render the login form */}
      <Formik
        initialValues={initialValues}
        validationSchema={SigninSchema}
        onSubmit={submitHandler}
        enableReinitialize={true}
      >
        {({
          handleChange,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View style={tw`w-65`}>
            <InputText
              placeholder="Email"
              image={emailImage}
              onChangeText={(e) => {
                handleChange("email")(e);
                ChangeHandle(e);
              }}
              placeholderColor="#BFC0CB"
              textInput={{ fontSize: fontPixel(17) }}
              value={values.email}
            />
            {/* Display error message if email field is touched and has error */}
            {errors.email && touched.email ? (
              <Text style={styles.error}>{errors.email}</Text>
            ) : null}
            <InputText
              placeholder="Password"
              image={passwordImage}
              secureTextEntry={true}
              placeholderColor="#BFC0CB"
              onChangeText={(e) => {
                handleChange("password")(e);
                ChangeHandle(e);
              }}
              textInput={{ fontSize: fontPixel(17) }}
              inputWrapper={{ paddingRight: pixelSizeHorizontal(10) }}
              value={values.password}
            />
            {/* Display error message if password field is touched and has error */}
            {errors.password && touched.password ? (
              <Text style={styles.error}>{errors.password}</Text>
            ) : null}
            <CustomButton
              title={'Forgot Password ?'}
              customButtom={styles.forgotButton}
              onPress={() => navigation.navigate('Forgot')}
            />
            <CustomButton title={'Sign in'} onPress={handleSubmit}
              customButtom={styles.signIn}
              buttonTitle={styles.buttonText}
            />
          </View>
        )}
      </Formik>
    </View>
  )
}

export default LoginForm;