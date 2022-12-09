import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import axios from 'axios';

import AsyncStorage from '@react-native-community/async-storage';
import {useTheme} from '@react-navigation/native';
import userid from '../../recoils/userId';
import usernickname from '../../recoils/userNickname';
import userkey from '../../recoils/userKey';
import {useRecoilState} from 'recoil';

const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

function Login({navigation}) {
  const [userId, setUserId] = useState('');
  const [useridR, setUseridR] = useRecoilState(userid);
  const [userNickname, setUserNickname] = useRecoilState(usernickname);
  const [userKey, setUserKey] = useRecoilState(userkey);
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');

  async function postData(id, password) {
    setErrortext('');
    if (!id) {
      alert('아이디를 입력해주세요 .');
      return;
    }
    if (!password) {
      alert('비밀번호를 입력해주세요 .');
      return;
    }
    setLoading(true);

    try {
      const response = await axios.post('http://10.0.2.2:80/user/signin', {
        id,
        password,
      });

      console.log(response.data);
      if (response.data.msg === 'login success') {
        console.log(response.data.result.nickname);
        AsyncStorage.setItem('user_id', userId);
        setUseridR(userId);
        setUserNickname(response.data.result.nickname);
        setUserKey(response.data.result.userid);
        setLoading(false);
        navigation.replace('Main');
      } else {
        alert('아이디와 비밀번호를 다시 확인해주세요 .');
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  }

  return (
    <LinearGradient colors={['#FFCDD2', '#FFAAB3']} style={styles.container}>
      <View style={styles.topArea}>
        <Text style={styles.introText}>안녕하세요 :)</Text>
        <Text style={styles.introText}>
          보유 식재료 기반 레시피 추천 플랫폼
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
          <Text
            style={{
              marginTop: Height * 0.01,
              fontSize: 30,
              fontFamily: 'Cafe24-Ohsquareair',
              color: 'white',
            }}>
            입맛춤
          </Text>
          <Text style={styles.introText}> 입니다.</Text>
        </View>
      </View>

      <View style={styles.formArea}>
        <TextInput
          style={styles.textFormTop}
          placeholder="ID"
          onChangeText={userId => setUserId(userId)}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.textFormBottom}
          placeholder="PASSWORD"
          onChangeText={userPassword => setUserPassword(userPassword)}
          autoCapitalize="none"
          secureTextEntry={true}
        />
      </View>
      <View style={{flex: 0.75}}>
        <View style={styles.btnArea}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => postData(userId, userPassword)}
            // onPress={() => navigation.navigate('Main')}
          >
            <Text style={{color: '#4f4d4d', fontFamily: 'GangwonEduAllBold'}}>
              로그인
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.btnArea}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate('Register')}>
            <Text style={{color: '#4f4d4d', fontFamily: 'GangwonEduAllBold'}}>
              회원가입
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{flex: 3}} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    paddingLeft: wp(7),
    paddingRight: wp(7),
  },
  topArea: {
    flex: 1,
    marginTop: wp(30),
    justifyContent: 'center',
    // backgroundColor: 'red',
    marginBottom: wp(7),
  },
  titleArea: {
    flex: 1,
    // backgroundColor: 'white',
    justifyContent: 'center',
    paddingTop: wp(0.3),
  },
  textArea: {
    flex: 1,
    // backgroundColor: 'green',
    justifyContent: 'center',
    paddingTop: wp(3),
  },
  text: {
    fontSize: wp('4%'),
  },
  formArea: {
    flex: 2,
    justifyContent: 'center',
    // backgroundColor: '',
    marginBottom: 2,
  },
  textFormTop: {
    borderColor: 'black',
    borderRadius: 7,
    width: '100%',
    height: Height * 0.095,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: 'white',
    marginBottom: Height * 0.01,
    fontFamily: 'GangwonEduAllBold',
  },
  textFormBottom: {
    borderColor: 'black',
    borderRadius: 7,
    width: '100%',
    height: Height * 0.095,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: 'white',
    marginBottom: Height * 0.01,
    fontFamily: 'GangwonEduAllBold',
  },
  btnArea: {
    justifyContent: 'center',
    alignItems: 'center',
    height: Height * 0.095,
    marginBottom: Height * 0.01,
  },
  btn: {
    flex: 1,
    width: '100%',
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffe0e3',
  },
  introText: {
    fontSize: 22,
    fontFamily: 'GangwonEduAllBold',
    marginTop: Height * 0.002,
    color: 'white',
  },
});

export default Login;
