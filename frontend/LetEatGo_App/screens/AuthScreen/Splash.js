import React, {useState, useEffect} from 'react';
import {ActivityIndicator, View, StyleSheet, Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import userid from '../../recoils/userId';
import usernickname from '../../recoils/userNickname';
import userkey from '../../recoils/userKey';
import {useRecoilState} from 'recoil';

import AsyncStorage from '@react-native-community/async-storage';

const Splash = ({navigation}) => {
  const [animating, setAnimating] = useState(true);
  const [KEY, setKEY] = useRecoilState(userkey);
  const [userId, setUserId] = useRecoilState(userid);
  const [userNickname, setUserNickName] = useRecoilState(usernickname);
  const STORAGE_KEY = `nickname`;

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);

      AsyncStorage.getItem('KEY').then(value => {
        setKEY(parseInt(value));
        console.log(value);
      });

      AsyncStorage.getItem(STORAGE_KEY).then(value => setUserNickName(value));
      AsyncStorage.getItem('user_id').then(value => {
        navigation.replace(value === null ? 'Auth' : 'Main');
        setUserId(value);
      });
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../android/app/assets/imgs/Text_logo.png')}
        style={{width: wp(75), resizeMode: 'contain', margin: 30}}
      />
      <ActivityIndicator
        animating={animating}
        color="#6990F7"
        size="large"
        style={styles.ActivityIndicator}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFAAB3',
  },
  ActivityIndicator: {
    alignItems: 'center',
    height: 80,
  },
});

export default Splash;
