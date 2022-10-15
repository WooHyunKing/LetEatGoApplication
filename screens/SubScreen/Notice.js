import React from 'react';
import {View, Text, Button} from 'react-native';

function Notice({navigation}) {
  return (
    <View>
      <Text>This is Notice screen !</Text>
      {/* <Button title="로그아웃" onPress={() => navigation.replace("Auth")} /> */}
    </View>
  );
}

export default Notice;
