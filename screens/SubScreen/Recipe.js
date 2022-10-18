import React from 'react';
import {View, Text, Button, Image, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import Topbar from '../Bar/Topbar';

function Recipe({navigation}) {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Topbar navigation={navigation} />
      <View style={{flex: 0.55}}>
        <View style={{flex: 0.6, backgroundColor: 'red'}}></View>
        <View style={{flex: 0.15, backgroundColor: 'black'}}></View>
        <View style={{flex: 0.25, backgroundColor: 'green'}}>
          <Text>
            ASMR MUKBANG 직접 만든 떡볶이 불닭볶음면 양념 치킨먹방! & 레시피
            FIRE NOODLES & Tteokbokki & FRIED CHICKEN EATING SOUND!
          </Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View>
              <TouchableOpacity style={styles.bottomButton} />
              <TouchableOpacity style={styles.bottomButton} />
              <TouchableOpacity style={styles.bottomButton} />
            </View>
            <Text>조회수 164,344회</Text>
          </View>
        </View>
      </View>
      <View style={{flex: 0.45, backgroundColor: 'blue'}}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomButton: {
    backgroundColor: 'white',
  },
});

export default Recipe;
