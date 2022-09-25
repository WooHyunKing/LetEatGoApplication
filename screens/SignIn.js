import React, {useState} from 'react';
import {View, Text, Button, StatusBar, StyleSheet, Image} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';

function SignIn({navigation}) {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  return (
    // <View>
    //   <Text>This is SignIn screen</Text>
    //   <StatusBar style="auto" />
    //   <TextInput
    //     placeholder="ID"
    //     value={userId}
    //     onChangeText={Id => setUserId(Id)}
    //     style={styles.input}
    //   />
    //   <TextInput
    //     placeholder="PASSWORD"
    //     value={userId}
    //     onChangeText={Id => setUserId(Id)}
    //     style={styles.input}
    //   />
    // </View>
    <View style={signin_styles.container}>
      <View style={{flex: 1.5}} />
      <View style={{flex: 2}}>
        <View style={signin_styles.logoArea}>
          <Image
            source={require('../android/app/assets/imgs/Main_logo.png')}
            style={{width: '55%', resizeMode: 'contain'}}
          />
        </View>
        <View style={signin_styles.btnArea} />
      </View>
      <View style={{flex: 1}} />
    </View>
  );
}

const signin_styles = StyleSheet.create({
  logoArea: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  btnArea: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default SignIn;
