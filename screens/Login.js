import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

function Login() {
  return (
    <LinearGradient colors={['#FFCDD2', '#FFAAB3']} style={styles.container}>
      <View style={styles.topArea}>
        <Image
          source={require('../android/app/assets/imgs/Login_logo.png')}
          style={{width: wp(25), resizeMode: 'contain'}}
        />
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
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    width: '100%',
    height: hp(8),
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: 'white',
  },
  textFormBottom: {
    borderWidth: 2,
    borderTopWidth: 1,
    borderColor: 'black',
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
    width: '100%',
    height: hp(8),
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: 'white',
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
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
});

export default Login;
