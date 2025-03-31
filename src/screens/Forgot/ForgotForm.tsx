import { Formik } from "formik";
import { View, Text, Image, Alert } from "react-native";
import CustomButton from "@components/common/Button";
import InputText from "@components/common/InputText";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import tw from 'twrnc';
import { AppDispatch, RootReducer } from "@redux/store";
import log from "@services/log";
import styles from "./styles";
import { forgotPassword } from "@redux/forgotSlice";
import { sendEmail } from "@redux/sendEmailSlice";

// Define the type for form values
type MyFormValues = {
  email: string;
};

// Define validation schema using Yup
const SigninSchema = Yup.object().shape({
  email: Yup.string()
    .email("Not a valid email")
    .required("Required"),
});

// Define the LoginForm component
const ForgotForm= () => {
  
  const dispatch = useDispatch<AppDispatch>();

  // Define images for email fields
  const emailImage =
  <Image source={require('@assets/images/inbox.png')} style={styles.images}/>
 
    // Define initial form values
  const initialValues: MyFormValues = { email: ""};

  // reset errors when changes in any field
  const ChangeHandle = (e: any) => {
    log.error(e);
  };

  /**
 * Handles the submission of the forgot form.
 * @param values The form values containing email.
 */
  const submitHandler = async (values: MyFormValues) => {
    // Create a payload object containing the email
    const payload = {
      email:values.email,
    }
    const emailPayload = {
      emailId:values.email,
      type:4
    }
    const response:any = await dispatch(forgotPassword(payload))
    if(response?.payload?.isSuccess == true){
      const response:any = await dispatch(sendEmail(emailPayload))
      if(response?.payload?.isSuccess == true){
        const message = "Email send successfully";
        Alert.alert(message);
      }else{
        const message = "Email not send";
        Alert.alert(message);
      }
    }else{
      const message = response?.payload?.message?.userMessage
      Alert.alert(message);
      }
  };


  return (
    <View style={styles.wrapper}>
      <Text style={styles.heading}>Forgot Password</Text>
      <View style={styles.textWrapper}>
        <Text style={styles.title}>Please enter the email you used for registration</Text>
      </View>
      {/* Render the forgot form */}
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
          <View style={ tw`w-65`}>
            <InputText
              placeholder="Email"
              image={emailImage}
              onChangeText={(e) => {
                handleChange("email")(e);
                ChangeHandle(e);
              }}
              value={values.email}
            />
            {/* Display error message if email field is touched and has error */}
            {errors.email && touched.email ? (
              <Text style={styles.error}>{errors.email}</Text>
            ) : null}
            <CustomButton title={'Reset Password'} onPress={handleSubmit}
              customButtom={styles.signIn}
              buttonTitle={styles.buttonText}/>
          </View>
        )}
      </Formik>
    </View>
  )
}



export default ForgotForm;