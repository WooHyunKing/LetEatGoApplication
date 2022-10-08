/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useState} from 'react';
import Home from './screens/Home';
import Cart from './screens/Cart';
import Refrigerator from './screens/Refrigerator';
import MyRecipe from './screens/MyRecipe';
import Logout from './screens/SignIn';
import SignIn from './screens/SignIn';
import Login from './screens/Login';
import Register from './screens/Register';
import Splash from './screens/Splash';
import Drawer from './screens/Drawer';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {TextInput} from 'react-native-gesture-handler';

// Stack Navigator for Login and Register and Logout Screen
const Auth = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{title: '', headerTransparent: true}}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{title: '', headerTransparent: true}}
      />
    </Stack.Navigator>
  );
};

const App: () => Node = () => {
  const [login, setLogin] = useState(false);

  //Screen과 Navigator의 속성을 포함하는 객체를 반환하는 함수

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{title: '', headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>

    // <NavigationContainer>
    //   <Tab.Navigator>
    //     <Tab.Screen name="Home" component={Home} />
    //     <Tab.Screen name="Cart" component={Cart} />
    //     <Tab.Screen name="Refrigerator" component={Refrigerator} />
    //     <Tab.Screen name="MyRecipe" component={MyRecipe} />
    //   </Tab.Navigator>
    // </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  input: {
    width: '200px',
    marginBottom: '25px',
  },
});

export default App;
