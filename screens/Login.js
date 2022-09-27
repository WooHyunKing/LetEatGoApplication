import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

function Login() {
  return (
    <View style={styles.container}>
      <View style={styles.topArea}>
        {/* <View style={styles.titleArea}>
          
        </View> */}
        <Image
          source={require('../android/app/assets/imgs/Login_logo.png')}
          style={{width: wp(50), resizeMode: 'contain'}}
        />
        {/* <View style={styles.textArea}>
          <Text style={styles.text}>이것은 로그인창입니다.</Text>
          <Text style={styles.text}>로그인을 해주세요.</Text>
        </View> */}
      </View>

      <View style={styles.formArea}>
        <TextInput style={styles.textFormTop} placeholder="ID" />
        <TextInput style={styles.textFormBottom} placeholder="PASSWORD" />
      </View>
      <View style={{flex: 0.75}}>
        <View style={styles.btnArea}>
          <TouchableOpacity style={styles.btn}>
            <Text style={{color: 'white'}}>로그인</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{flex: 3}} />
    </View>
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
    marginTop: wp(40),
    justifyContent: 'center',
    // backgroundColor: 'red',
    marginBottom: wp(10),
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
    flex: 1.5,
    justifyContent: 'center',
    // backgroundColor: '',
    marginBottom: 10,
  },
  textFormTop: {
    borderWidth: 2,
    borderBottomWidth: 1,
    borderColor: 'black',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    width: '100%',
    height: hp(8),
    paddingLeft: 10,
    paddingRight: 10,
  },
  textFormBottom: {
    borderWidth: 2,
    borderTopWidth: 1,
    borderColor: 'black',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    width: '100%',
    height: hp(8),
    paddingLeft: 10,
    paddingRight: 10,
  },
  btnArea: {
    justifyContent: 'center',
    alignItems: 'center',
    height: hp(8),
    paddingBottom: hp(1.5),
  },
  btn: {
    flex: 1,
    width: '100%',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
});

export default Login;
