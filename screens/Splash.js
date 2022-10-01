import React, {useState, useEffect} from 'react';
import {ActivityIndicator, View, StyleSheet, Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// import AsyncStorage from '@react-native-community/async-storage';

const Splash = ({navigation}) => {
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      AsyncStorage.getItem('user_id').then(value =>
        navigation.replace(value === null ? 'Auth' : 'DrawerNavigationRoutes'),
      );
    }, 3000);
  }, []);

  return (
    <View>
      <Image
        source={require('../android/app/assets/imgs/Text_logo.png')}
        style={{width: wp(55), resizeMode: 'contain', margin: 30}}
      />
      <ActivityIndicator animating={animating} color="#6990F7" size="large" />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  ActivityIndicator: {
    alignItems: 'center',
    height: 80,
  },
});
