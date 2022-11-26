import React from 'react';
import {View, Text, Button, TouchableOpacity} from 'react-native';
import Topbar from '../Bar/Topbar';

import {atom, useRecoilState} from 'recoil';

function Survey({navigation}) {
  return (
    <View>
      <Topbar navigation={navigation} />
      <Text>This is Survey screen !</Text>
    </View>
  );
}

export default Survey;
