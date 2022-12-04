import React, {useReducer, useState} from 'react';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// import RNPickerSelect from 'react-native-picker-select';
import LinearGradient from 'react-native-linear-gradient';
import {Picker} from '@react-native-picker/picker';

import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Keyboard,
  Modal,
  ScrollView,
  Platform,
  Dimensions,
} from 'react-native';
import axios from 'axios';
import {post} from '../../../../backend/routes/user';

const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

function Register({navigation}) {
  const [userId, setUserId] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userPasswordCheck, setUserPasswordCheck] = useState('');
  const [nickname, setNickname] = useState('');
  const [sex, setSex] = useState(false);
  const [contact, setContact] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');

  const placeholder = {
    label: '성별을 선택해주세요',
    value: null,
  };

  async function postData(id, password, nickname, sex) {
    setErrortext('');
    if (!id) {
      alert('아이디를 입력해주세요 .');
      return;
    }
    if (!password) {
      alert('비밀번호를 입력해주세요 .');
      return;
    }
    if (!nickname) {
      alert('닉네임를 입력해주세요 .');
      return;
    }
    // if (!sex) {
    //   alert('성별을 입력해주세요 .');
    //   return;
    // }
    // if (!contact) {
    //   alert('연락처를 입력해주세요 .');
    //   return;
    // }
    setLoading(true);

    try {
      const response = await axios.post('http://10.0.2.2:80/signup', {
        id,
        password,
        nickname,
        sex,
      });

      if (response.data.statusCode === 200) {
        setLoading(false);
        navigation.replace('Login');
      } else if (response.data.msg === 'id that already exists') {
        alert('동일한 아이디가 이미 존재합니다.');
        setLoading(flase);
      } else if (response.data.msg === 'nickname that already exists') {
        alert('동일한 닉네임이 이미 존재합니다.');
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  }

  async function handleSubmitButton(
    userId,
    userPassword,
    userPasswordCheck,
    nickname,
    sex,
  ) {
    setErrortext('');
    if (!userId) {
      alert('아이디를 입력해주세요 .');
      return;
    }
    if (!userPassword) {
      alert('비밀번호를 입력해주세요 .');
      return;
    }
    if (!userPasswordCheck) {
      alert('비밀번호 확인을 입력해주세요 .');
      return;
    }
    if (!nickname) {
      alert('닉네임을 입력해주세요 .');
      return;
    }
    // if (!sex) {
    //   alert('성별을 입력해주세요 .');
    //   return;
    // }
    // if (!contact) {
    //   alert('연락처를 입력해주세요 .');
    //   return;
    // }
  }

  return (
    <LinearGradient colors={['#FFCDD2', '#FFAAB3']} style={styles.container}>
      <View style={styles.topArea}>
        <Text
          style={{
            fontSize: 30,
            color: 'white',
            fontFamily: 'GangwonEduAllBold',
          }}>
          회원가입
        </Text>
      </View>
      <View style={styles.formArea}>
        <View>
          <Text style={styles.titleText}>ID</Text>
          <TextInput
            placeholder="아이디(5자 이상, 영문, 숫자 포함)"
            style={styles.formAreaTop}
            onChangeText={userId => setUserId(userId)}
            autoCapitalize="none"
          />
        </View>
        <View>
          <Text style={styles.titleText}>Password</Text>
          <TextInput
            placeholder="비밀번호(8자 이상)"
            secureTextEntry={true}
            style={styles.formAreaMiddle}
            onChangeText={userPassword => setUserPassword(userPassword)}
            autoCapitalize="none"
          />
        </View>
        <View>
          <Text style={styles.titleText}>Password Check</Text>
          <TextInput
            placeholder="비밀번호 확인"
            secureTextEntry={true}
            style={styles.formAreaBottom}
            onChangeText={userPasswordCheck =>
              setUserPasswordCheck(userPasswordCheck)
            }
            autoCapitalize="none"
          />
        </View>
        <View>
          <Text style={styles.titleText}>Nickname</Text>
          <TextInput
            placeholder="닉네임"
            style={styles.formAreaTop}
            onChangeText={nickname => setNickname(nickname)}
            autoCapitalize="none"
          />
        </View>

        <View>
          <Text style={styles.titleText}>Gender</Text>
          {/* <TextInput
            placeholder="성별"
            style={styles.formAreaMiddle}
            // onChangeText={sex => setSex(sex)}
            autoCapitalize="none"
          /> */}
          <View style={styles.formAreaMiddle}>
            <Picker
              selectedValue={sex}
              onValueChange={(itemValue, itemIndex) => setSex(itemValue)}>
              <Picker.Item
                fontFamily="GangwonEduAllBold"
                label="남"
                value={false}
              />
              <Picker.Item
                fontFamily="GangwonEduAllBold"
                label="여"
                value={true}
              />
            </Picker>
          </View>
        </View>

        <View style={styles.btnArea}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => postData(userId, userPassword, nickname, sex)}>
            <Text
              style={{
                color: 'white',
                fontSize: wp(4),
                fontFamily: 'GangwonEduAllBold',
              }}>
              회원가입
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          flex: 0.03,
          justifyContent: 'flex-start',
          // backgroundColor: "blue",
          marginBottom: wp('2%'),
        }}>
        {userPassword !== userPasswordCheck ? (
          <Text style={styles.textValidation}>
            비밀번호가 일치하지 않습니다 .
          </Text>
        ) : null}
      </View>
    </LinearGradient>
  );
}

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: wp(7),
    paddingRight: wp(7),
    paddingTop: wp(10),
  },
  topArea: {
    flex: 0.1,
    paddingTop: wp(5),
  },
  titleArea: {
    flex: 0.6,
    justifyContent: 'center',
  },
  textArea: {
    flex: 0.4,
    justifyContent: 'center',
  },
  Text: {
    fontSize: wp(4),
  },
  formArea: {
    flex: 0.9,
    padding: 0,
  },
  formAreaTop: {
    borderRadius: 7,
    width: '100%',
    height: Height * 0.075,
    backgroundColor: 'white',
    marginBottom: Height * 0.015,
    paddingHorizontal: Width * 0.03,
    fontFamily: 'GangwonEduAllBold',
  },
  formAreaMiddle: {
    borderRadius: 7,
    width: '100%',
    height: Height * 0.075,
    backgroundColor: 'white',
    marginBottom: Height * 0.015,
    paddingHorizontal: Width * 0.03,
    fontFamily: 'GangwonEduAllBold',
  },
  formAreaBottom: {
    borderRadius: 7,
    width: '100%',
    height: Height * 0.075,
    backgroundColor: 'white',
    marginBottom: Height * 0.015,
    paddingHorizontal: Width * 0.03,
    fontFamily: 'GangwonEduAllBold',
  },
  btnArea: {
    height: hp(8),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  btn: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    borderRadius: 5,
  },
  textValidation: {
    fontSize: wp('4%'),
    color: 'red',
  },

  titleText: {
    color: 'white',
    fontFamily: 'GangwonEduAllBold',
    fontSize: 18,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    borderWidth: 2,
    borderTopWidth: 1,
    borderColor: 'black',
    width: '100%',
    paddingLeft: 10,
  },
  inputAndroid: {
    borderWidth: 2,
    borderTopWidth: 1,
    borderColor: 'black',
    width: '100%',
    paddingLeft: 10,
  },
});
