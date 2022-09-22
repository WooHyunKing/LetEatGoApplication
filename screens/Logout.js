import React from 'react';
import {View, Text, Button} from 'react-native';

function Logout({navigation}) {
  return (
    <View>
      <Text>This is Logout screen</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}

export default Logout;
