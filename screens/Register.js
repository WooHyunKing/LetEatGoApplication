import React from 'react';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import RNPickerSelect from 'react-native-picker-select';

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
          <Text style={styles.Text}>회원가입하여 나만의 레시피 공간</Text>
          <Text style={styles.Text}>입맛춤을 사용해보세요 🍖</Text>
        </View>
      </View>
      <View style={styles.formArea}>
        <TextInput
          placeholder="아이디(5자 이상, 영문, 숫자 포함)"
          style={styles.formAreaTop}
        />
        <TextInput
          placeholder="비밀번호(8자 이상)"
          secureTextEntry={true}
          style={styles.formAreaMiddle}
        />
        <TextInput
          placeholder="비밀번호 확인"
          secureTextEntry={true}
          style={styles.formAreaBottom}
        />
      </View>
      <View style={styles.formArea2}>
        <TextInput placeholder="닉네임" style={styles.formAreaTop} />
        {/* <RNPickerSelect
            style={pickerSelectStyles}
            fixAndroidTouchableBug={true}
            useNativeAndroidPickerStyle={false}
          items={[
            {label: '남', value: 1},
            {label: '여', value: 2},
          ]}
        /> */}
        <TextInput placeholder="성별" style={styles.formAreaMiddle} />
        <TextInput placeholder="연락처" style={styles.formAreaBottom} />
      </View>
      <View style={{flex: 0.2}}>
        <View style={styles.btnArea}>
          <TouchableOpacity style={styles.btn}>
            <Text style={{color: 'white', fontSize: wp(4)}}>회원가입</Text>
          </TouchableOpacity>
        </View>
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
    flex: 0.3,
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
    flex: 0.25,
    padding: 0,
  },
  formArea2: {
    flex: 0.25,
  },
  formAreaTop: {
    borderWidth: 2,
    borderColor: 'black',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomWidth: 1,
    paddingLeft: 10,
  },
  formAreaMiddle: {
    borderWidth: 2,
    borderColor: 'black',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingLeft: 10,
  },
  formAreaBottom: {
    borderWidth: 2,
    borderColor: 'black',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderTopWidth: 1,
    paddingLeft: 10,
  },
  btnArea: {
    height: hp(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    borderRadius: 5,
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
