import React from 'react';
import {View, Text, Button} from 'react-native';

function Search({navigation}) {
  return (
    <View>
      <Text>This is Search screen !</Text>
      {/* <Button title="로그아웃" onPress={() => navigation.replace("Auth")} /> */}
    </View>
  );
}

export default Search;
