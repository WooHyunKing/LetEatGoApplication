import React from 'react';
import {View, Text, Button} from 'react-native';
import Topbar from '../Bar/Topbar';

function AfterSurvey({navigation}) {
  return (
    <View>
      <Topbar navigation={navigation} />
      <Text>This is AfterSurvey screen !</Text>
    </View>
  );
}

export default AfterSurvey;
