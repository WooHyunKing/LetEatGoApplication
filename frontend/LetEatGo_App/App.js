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
import {RecoilRoot} from 'recoil';
import Home from './screens/MainScreen/Home';
import Cart from './screens/MainScreen/Cart';
import Refrigerator from './screens/MainScreen/Refrigerator';
import MyRecipe from './screens/MainScreen/MyRecipe';
import Login from './screens/AuthScreen/Login';
import Register from './screens/AuthScreen/Register';
import Splash from './screens/AuthScreen/Splash';
import Mbti from './screens/SubScreen/Mbti';
import Notice from './screens/SubScreen/Notice';
import Recipe from './screens/SubScreen/Recipe';
import Search from './screens/SubScreen/Search';
import Survey from './screens/SubScreen/Survey';
import MbtiSurvey from './screens/SubScreen/MbtiSurvey';
import AfterSurvey from './screens/SubScreen/AfterSurvey';
import SearchResult from './screens/SubScreen/SearchResult';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();

import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {TextInput} from 'react-native-gesture-handler';

const HomeStackScreen = ({navigation, route}) => {
  return (
    <HomeStack.Navigator initialRouteName="HomeScreen">
      <HomeStack.Screen
        name="HomeScreen"
        component={Home}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="Search"
        component={Search}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="Notice"
        component={Notice}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="Recipe"
        component={Recipe}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="Survey"
        component={Survey}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="AfterSurvey"
        component={AfterSurvey}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="MbtiServey"
        component={MbtiSurvey}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="MbtiResult"
        component={Mbti}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="Refrigerator"
        component={Refrigerator}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="SearchResult"
        component={SearchResult}
        options={{headerShown: false}}
      />
    </HomeStack.Navigator>
  );
};

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

const Main = ({navigation, route}) => {
  return (
    <Tab.Navigator
      style={styles.top}
      initialRouteName="Home"
      screenOptions={{
        tabBarLabelStyle: {
          color: '#FFAAB3',
          fontWeight: '500',
          fontSize: 11,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return (
              <Image source={require('./android/app/assets/icons/Home.png')} />
            );
          },
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return (
              <Image source={require('./android/app/assets/icons/Cart.png')} />
            );
          },
        }}
      />
      <Tab.Screen
        name="Refrigerator"
        component={Refrigerator}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return (
              <Image
                source={require('./android/app/assets/icons/Refrigerator.png')}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="MyRecipe"
        component={MyRecipe}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return (
              <Image
                source={require('./android/app/assets/icons/MyRecipe.png')}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};
const App: () => Node = () => {
  const [login, setLogin] = useState(false);

  //Screen과 Navigator의 속성을 포함하는 객체를 반환하는 함수

  return (
    <RecoilRoot>
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
            name="Main"
            component={Main}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </RecoilRoot>

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
  top: {
    backgroundColor: '#FFAAB3',
  },
});

export default App;
