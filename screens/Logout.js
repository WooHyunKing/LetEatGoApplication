import React from 'react';
import {View, Text, Button} from 'react-native';

function Logout({navigation}) {
  return (
    <View>
      <Text>Start!</Text>
      <Button title="Go to main" onPress={() => navigation.navigate('Main')} />
    </View>
  );
}

export default Logout;
