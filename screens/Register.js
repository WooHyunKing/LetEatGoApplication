import React from 'react';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

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
} from 'react-native';

function Register() {
  return (
    <View style={styles.container}>
      <View style={styles.topArea}>
        <View style={styles.titleArea}>
          <Image
            source={require('../android/app/assets/imgs/Register_logo.png')}
            style={{width: wp(30), resizeMode: 'contain'}}
          />
        </View>
        <View style={styles.textArea}>
          <Text>회원가입하여 나만의 레시피 공간</Text>
          <Text>입맛춤을 사용해보세요 🍖</Text>
        </View>
      </View>
      <View style={styles.formArea}>
        <TextInput placeholder="아이디(5자 이상, 영문, 숫자 포함)" />
        <TextInput placeholder="비밀번호(8자 이상)" secureTextEntry={true} />
        <TextInput placeholder="비밀번호 확인" secureTextEntry={true} />
      </View>
      <View style={styles.formArea2}>
        <TextInput placeholder="닉네임" />
        <TextInput placeholder="성별" />
        <TextInput placeholder="연락처" />
      </View>
    </View>
  );
}

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    paddingLeft: wp(7),
    paddingRight: wp(7),
  },
  topArea: {
    flex: 1.5,
    paddingTop: wp(2),
  },
  titleArea: {
    flex: 0.7,
    justifyContent: 'center',
  },
  textArea: {
    flex: 0.3,
    justifyContent: 'center',
  },
});
