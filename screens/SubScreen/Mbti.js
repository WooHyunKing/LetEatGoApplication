import React from 'react';
import {View, Text, Button} from 'react-native';

function Mbti({navigation}) {
  return (
    <View>
      <Text>This is MBTI screen !</Text>
      {/* <Button title="로그아웃" onPress={() => navigation.replace("Auth")} /> */}
    </View>
  );
}

export default Mbti;
