import React from 'react';
import {View, Text, Button} from 'react-native';

import Topbar from '../Bar/Topbar';

function Recipe({navigation}) {
  return (
    <View>
      <Topbar navigation={navigation} />
    </View>
  );
}

export default Recipe;
