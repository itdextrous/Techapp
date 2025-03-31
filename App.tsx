/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler';
import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import StackNavigation from '@navigations/StackNavigation';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import store from "@redux/store";
import { PaperProvider } from 'react-native-paper';
import TrackPlayer from 'react-native-track-player';

TrackPlayer.registerPlaybackService(() => require('services/trakkPlayer.service'));
const persistor = persistStore(store);
function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          />
          <PaperProvider>
            <View style={{
              flex: 1,
              backgroundColor: isDarkMode ? Colors.black : Colors.white,
            }}>
              <StackNavigation />
            </View>
          </PaperProvider>
        </PersistGate>
      </Provider>
    </SafeAreaView>
  );
}

export default App;
