import React, { FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// REDUX IMPORTS
import { store } from './redux/Store';
import { Provider } from 'react-redux';

import AppLoading from 'expo-app-loading';

import {
  useFonts,
  Chivo_300Light,
  Chivo_300Light_Italic,
  Chivo_400Regular,
  Chivo_400Regular_Italic,
  Chivo_700Bold,
  Chivo_700Bold_Italic,
} from '@expo-google-fonts/chivo';
import TabIcon from './components/TabIcons/TabIcon';

import Icons from './constants/Icons';

// Screen Imports

import Portfolio from './screens/Portfolio';
import Market from './screens/Market';
import News from './screens/News';

const Tab = createBottomTabNavigator();

const App: FC = () => {
  let [fontsLoaded] = useFonts({
    Chivo_300Light,
    Chivo_300Light_Italic,
    Chivo_400Regular,
    Chivo_400Regular_Italic,
    Chivo_700Bold,
    Chivo_700Bold_Italic,
  });
  if (!fontsLoaded) return <AppLoading />;

  // Bottom Tab Navigation
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName='Portfolio'
          // Tab Styling
          screenOptions={({ route }) => ({
            tabBarShowLabel: false,
            tabBarStyle: {
              position: 'absolute',
              paddingTop: 10,
              paddingBottom: 10,
              bottom: 20,
              right: 10,
              left: 10,
              borderRadius: 100,
              height: 70,
              justifyContent: 'center',
              alignItems: 'center',

              borderTopWidth: 0,
              backgroundColor: '#121212',
              elevation: 8,
            },

            tabBarLabelStyle: {
              fontSize: 13,
              fontFamily: 'Chivo_400Regular',
              letterSpacing: 1.5,
              paddingBottom: 7,
            },

            // Icons for Nav Bar
            tabBarIcon: ({ focused, color }) => {
              let iconName: string | any;

              if (route.name === 'Portfolio') {
                iconName = focused ? 'ios-pie-chart' : 'ios-pie-chart-outline';
              } else if (route.name === 'Market') {
                return <TabIcon icon={focused ? Icons.barFilled : Icons.bar} />;
              } else if (route.name === 'News') {
                iconName = focused ? 'ios-newspaper' : 'ios-newspaper-outline';
              }

              // You can return any component that you like here!
              return <Ionicons name={iconName} size={30} color={color} />;
            },
            tabBarActiveTintColor: '#fff',
            tabBarInactiveTintColor: 'white',
          })}
        >
          <Tab.Screen
            name='Market'
            component={Market}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name='Portfolio'
            component={Portfolio}
            options={{ headerShown: false }}
          />

          <Tab.Screen
            name='News'
            component={News}
            options={{ headerShown: false }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
