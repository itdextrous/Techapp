import React from 'react';
import { CommonActions, RouteProp } from '@react-navigation/native';
import { BottomTabNavigationProp, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, BottomNavigation } from 'react-native-paper';
import ProjectComponent from '@assets/svgImages/project';
import TasksComponent from '@assets/svgImages/tasks';
import CheckIns from '@screens/CheckIns/CheckIns';
import CheckInComponent from '@assets/svgImages/checkIn';
import { AssetsNavigations, ProjectNavigations, TaskNavigations } from './StackNavigation';
import AssetsComponent from '@assets/svgImages/assets';
import { useSelector } from 'react-redux';
import { RootReducer } from '@redux/store';
import { IPermissions } from '@interfaces/permissions';
import { View } from 'react-native';
import { fontPixel, heightPixel } from '@utils/helpers/customStyles';

// Define the type for the navigation parameters
export type TabNavigationParamList = {
  Projects: { screen: string };
  Tasks: { screen: string, name: string };
  "Check-In": undefined;
  "Assets ": undefined;
  Notification: undefined
};

const Tab = createBottomTabNavigator<TabNavigationParamList>();

export type TabNavigationProps = {
  navigation: BottomTabNavigationProp<TabNavigationParamList>;
  route: RouteProp<TabNavigationParamList>;
};
const PlaceholderScreen = () => <View style={{ flex: 1 }} />;
const TabNavigation = () => {
  const { userInfos } = useSelector((state: RootReducer) => state.userInformation);

  const users = JSON.parse(userInfos && userInfos.allowedPermissions)
  const assetsPermissions = userInfos && users && users.filter(
    (permission: any) => permission.PermissionCode === "VAST"
  );
  const checkinPermissions = userInfos && users && users.filter(
    (permission: any) => permission.PermissionCode === "VCIN"
  );
  const checkinShow = () => {
    if (
      checkinPermissions && checkinPermissions !== undefined && checkinPermissions.length > 0 &&
      checkinPermissions[0].IsAllowed
    ) {
      return true;
    } else {
      return false
    }
  }
  const assetsShow = () => {
    if (
      assetsPermissions && assetsPermissions !== undefined && assetsPermissions.length > 0 &&
      assetsPermissions[0].IsAllowed
    ) {
      return true;
    } else {
      return false
    }
  }
  const checkInRender = () => {
    return <Tab.Screen
      name="Check-In"
      component={CheckIns}
      options={{
        tabBarLabel: 'Check-In',
        tabBarIcon: ({ color, size, focused }) => {
          return focused ? <CheckInComponent color={"#8585F2"} />
            : <CheckInComponent color={"#FFFFFF"} />
        },
      }}
    />
  }

  const assetsRender = () => {
    return <Tab.Screen
      name="Assets "
      component={AssetsNavigations}
      options={{
        tabBarLabel: 'Assets ',
        tabBarIcon: ({ color, size, focused }) => {
          return focused ? <AssetsComponent color={"#8585F2"} />
            : <AssetsComponent color={"#FFFFFF"} />
        },
      }}
    />
  }

  const commonScreen = (name:any)=>{
    return <Tab.Screen
    name={name}
    component={PlaceholderScreen}
    listeners={({ navigation }) => ({
      tabPress: (e) => {
        e.preventDefault(); // Prevent default tab press behavior
      },
    })}
  />
  }
  
  const permissionsTab = () => {
    if (checkinShow() && assetsShow()) {
      return <>
        {checkInRender()}
        {assetsRender()}
      </>
    } else if (checkinShow() && !assetsShow()) {
      return <>
        {checkInRender()}
        {commonScreen("Assets ")}
      </>
    } else if (!checkinShow() && assetsShow()) {
      return <>
       {assetsRender()}
       {commonScreen("Check-In")}
      </>
    }
    else {
      return <>
        {commonScreen("Check-In")}
        {commonScreen("Assets ")}
      </>
    }
  }
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={({ navigation, state, descriptors, insets }) => (
        <BottomNavigation.Bar
          activeIndicatorStyle={{ backgroundColor: 'transparent' }}
          navigationState={state}
          style={{ backgroundColor: 'rgba(54,52,53, 1)', }}
          safeAreaInsets={insets}
          onTabPress={({ route, preventDefault }) => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (event.defaultPrevented) {
              preventDefault();
            } else {
              navigation.dispatch({
                ...CommonActions.navigate(route.name, route.params),
                target: state.key,
              });
            }
          }}
          renderLabel={({ route, focused }) => {
            return <Text style={{
              color: focused ? '#8585F2' : '#FFFFFF',
              textAlign: 'center',
              fontSize: fontPixel(16),
              height: heightPixel(30)
            }}>{route.name == "Assets " && !assetsShow() ?
              null :
              route.name == "Check-In" && !checkinShow() ?
                null :
                route.name
              }</Text>
          }}
          renderIcon={({ route, focused, color }) => {
            const { options } = descriptors[route.key];
            if (options.tabBarIcon) {
              return options.tabBarIcon({ focused, color, size: 24 });
            }

            return null;
          }}

        />
      )}
    >
      <Tab.Screen
        name="Projects"
        component={ProjectNavigations}
        options={{
          tabBarLabel: 'Projects',
          tabBarIcon: ({ color, size, focused }) => {
            return focused ? <ProjectComponent color={"#8585F2"} />
              : <ProjectComponent color={"#FFFFFF"} />
          },
        }}
        listeners={({ navigation }) => ({
          tabPress: e => {
            e.preventDefault(); // Prevent default tab press behavior
            navigation.navigate('Project'); // Reset the stack
          }
        })}
      />
      <Tab.Screen
        name="Tasks"
        component={TaskNavigations}
        initialParams={{ name: '' }}
        options={{
          tabBarLabel: 'Tasks',
          tabBarIcon: ({ color, size, focused }) => {
            return focused ? <TasksComponent color={"#8585F2"} />
              : <TasksComponent color={"#FFFFFF"} />;
          },
        }}
        listeners={({ navigation }) => ({
          tabPress: e => {
            e.preventDefault(); // Prevent default tab press behavior
            navigation.navigate('Tasks', { screen: 'Tasks ' }); // Reset the stack
          }
        })}
      />
      {permissionsTab()}
    </Tab.Navigator>
  );
}

export default TabNavigation;