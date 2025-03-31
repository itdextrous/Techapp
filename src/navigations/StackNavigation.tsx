
import * as React from 'react';
import { View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '@screens/Login/LoginScreen';
import { CommonActions, NavigationContainer } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import tw from 'twrnc';
import TabNavigation from './TabNavigation';
import { RootReducer } from '@redux/store';
import TaskScreen from '@screens/Task/TaskScreen';
import EditTasks from '@screens/EditTasks/EditTasks';
import AssetsScreen from '@screens/Assets/AssetsScreen';
import AssetDetails from '@screens/Assets/AssetDetails';
import ForgotScreen from '@screens/Forgot/ForgotPasswordScreen';
import { IProjects } from '@interfaces/projectList';
import Notes from '@screens/EditTasks/Notes';
import Toast from 'react-native-toast-message';
import CustomToast from '@components/common/CustomToast';
import ErrorBoundary from '@services/ErrorBoundry';
import DisplayPdf from '@components/common/DisplayPdf';
import { useEffect } from 'react';
import ProjectScreen from '@screens/Project/ProjectScreen';
import NotificationScreen from '@screens/Notification/NotificationScreen';
import LoginLayout from '@components/layouts/LoginLayout';
import jwtDecode from 'jwt-decode';
import { logout } from '@redux/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '@components/common/Loader';

// Define the type for the stack navigator parameters
type RootStackParamList = {
  Login: undefined;
  Forgot: undefined;
  Tab: undefined
};

// Create a stack navigator with the specified parameter list
const Stack = createNativeStackNavigator<RootStackParamList>();

// Define the StackNavigation component
const StackNavigation = () => {
  // Retrieve the authentication token from the application state.
  const { userData } = useSelector((state: RootReducer) => state.auth);
  const dispatch = useDispatch();
  const [isCheckingAuth, setIsCheckingAuth] = React.useState(true);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  React.useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem("auth_token");
        if (token) {
          const decodedToken:any = jwtDecode(token);
          const currentTime = Date.now() / 1000;

          if (decodedToken?.exp < currentTime) {
            await AsyncStorage.removeItem("auth_token");
            dispatch(logout()); // Clear user data in Redux
            setIsAuthenticated(false);
          } else {
            setIsAuthenticated(true);
          }
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.log("Error checking token:", error);
        setIsAuthenticated(false);
      }
      setIsCheckingAuth(false);
    };

    checkToken();
  }, [userData]);
   
  if (isCheckingAuth) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <Loader height={"100%"} background={"FFFFFF"}/>
      </View>
    );
  }

  return (
    <View style={tw`flex-1 w-full`}>
      <NavigationContainer>
        <Stack.Navigator>
          {/* Define a screen named "Login" with the LoginScreen component */}
          {!isAuthenticated ?
            <React.Fragment>
              <Stack.Screen name="Login"
                component={LoginLayout(LoginScreen, 'auth')}
                options={{
                  headerShown: false,
                }} />
              <Stack.Screen name="Forgot"
                component={LoginLayout(ForgotScreen, 'forgotPassword')}
                options={{
                  headerShown: false,
                }} />
            </React.Fragment>
            :
            <Stack.Screen name="Tab" component={TabNavigation} options={{
              headerShown: false,
            }} />

          }
        </Stack.Navigator>
        <Toast
          config={{
            customToast: (props:any) => (
              <CustomToast
                {...props}
                autoHide={props.autoHide}
                visibilityTime={props.visibilityTime}
              />
            ),
          }}
          position="bottom"
        />
      </NavigationContainer>
    </View>
  );
}

export default StackNavigation;


// Create a stack navigator with the specified parameter list
export type ProjectStackParamList = {
  "Project": undefined;
  'Notification': undefined;
};

// Create a stack navigator with the specified parameter list
const ProjectStack = createNativeStackNavigator<ProjectStackParamList>();

// Define the TaskNavigations component
export const ProjectNavigations = ({ route, navigation }: any) => {
  const screenName = route.params?.screen
  useEffect(() => {
    // Reset the stack to 'Tasks ' when the component is mounted
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Project' }],
      })
    );
  }, [navigation]);
  return (
    <ErrorBoundary screenName={'Project screen'}>
      <View style={tw`flex-1 w-full`}>
        {/* {screenName == 'Project' && */}
        <ProjectStack.Navigator initialRouteName={screenName}>
          {/* Define a screen named "Login" with the LoginScreen component */}
          <ProjectStack.Screen name="Project" component={ProjectScreen} options={{
            headerShown: false,
          }} />
          <ProjectStack.Screen name="Notification" component={NotificationScreen} options={{
            headerShown: false,
          }} />
        </ProjectStack.Navigator>
        {/* } */}
      </View>
    </ErrorBoundary>
  );
}

// Create a stack navigator with the specified parameter list
export type TaskStackParamList = {
  "Tasks ": { task: IProjects };
  'Edit Task': undefined;
  Notes: undefined,
  PdfNavigations: { item: string, mimeType: string }
};

// Create a stack navigator with the specified parameter list
const TaskStack = createNativeStackNavigator<TaskStackParamList>();

// Define the TaskNavigations component
export const TaskNavigations = ({ route, navigation }: any) => {
  const screenName = route.params?.screen || 'Tasks ';
  const from = route.params?.params?.from || {};
  useEffect(() => {
    // Reset the stack to 'Tasks ' when the component is mounted
    if (from !== 'Notification') {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Tasks ' }],
        })
      );
    }
  }, [navigation]);
  return (
    <ErrorBoundary screenName={'Task screen'}>
      <View style={tw`flex-1 w-full`}>
        {/* {screenName == 'Tasks ' && */}
        <TaskStack.Navigator initialRouteName={screenName}>
          {/* Define a screen named "Login" with the LoginScreen component */}
          <TaskStack.Screen name="Tasks " component={TaskScreen} options={{
            headerShown: false,
          }} />
          <TaskStack.Screen name="Edit Task" component={EditTasks} options={{
            headerShown: false,
          }} />
          <TaskStack.Screen name="Notes" component={Notes} options={{
            headerShown: false,
          }} />
          <TaskStack.Screen name="PdfNavigations" component={PdfNavigations} options={{
            headerShown: false,
          }} />
        </TaskStack.Navigator>
        {/* } */}
      </View>
    </ErrorBoundary>
  );
}

// Create a stack navigator with the specified parameter list
type AssetsStackParamList = {
  Assets: undefined;
  'Assets Details': undefined;
};

// Create a stack navigator with the specified parameter list
const AssetsStack = createNativeStackNavigator<AssetsStackParamList>();

// Define the AssetsNavigations component
export const AssetsNavigations = () => {
  return (
    <ErrorBoundary screenName={'Assets screen'}>
      <View style={tw`flex-1 w-full`}>
        <AssetsStack.Navigator initialRouteName='Assets'>
          <AssetsStack.Screen name="Assets" component={AssetsScreen} options={{
            headerShown: false,
          }} />
          <AssetsStack.Screen name="Assets Details" component={AssetDetails} options={{
            headerShown: false,
          }} />

        </AssetsStack.Navigator>
      </View>
    </ErrorBoundary>
  );
}


// Create a stack navigator for pdf screen
type DisplayPfdList = {
  DisplayPdf: undefined
};

// Create a stack navigator with the specified parameter list
const PdfStack = createNativeStackNavigator<DisplayPfdList>();

// Define the AssetsNavigations component
export const PdfNavigations = ({ route }: any) => {
  return (
    <ErrorBoundary screenName={'Document screen'}>
      <View style={tw`flex-1 w-full`}>
        <PdfStack.Navigator >
          <PdfStack.Screen name="DisplayPdf" component={DisplayPdf} options={{
            headerShown: false,
          }}
            initialParams={route.params} />
        </PdfStack.Navigator>
      </View>
    </ErrorBoundary>
  );
}


