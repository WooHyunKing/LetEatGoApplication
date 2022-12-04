import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Topbar from '../Bar/Topbar';

const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

function AfterSurvey({navigation}) {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Topbar navigation={navigation} />
      <View style={{height: '100%', alignItems: 'center'}}>
        <Image
          source={require('../../android/app/assets/icons/congrats.png')}
          style={styles.CongratIcon}
        />
        <Text
          style={{
            fontFamily: 'Happiness-Sans-Regular',
            fontSize: 17,
            fontWeight: '500',
          }}>
          취향조사가 완료 되었습니다!
        </Text>
        <Text
          style={{
            fontFamily: 'Cafe24-Ohsquareair',
            marginTop: '5%',
            fontSize: 15,
            fontWeight: '500',
          }}>
          취향이 반영된 추천 레시피가 나오고 있어요.
        </Text>
        <Text
          style={{
            fontFamily: 'Cafe24-Ohsquareair',
            marginTop: '5%',
            fontSize: 14,
            fontWeight: '400',
          }}>
          한번 더 조사하면 더 정확한
        </Text>
        <Text
          style={{
            fontFamily: 'Cafe24-Ohsquareair',
            fontSize: 14,
            fontWeight: '400',
            marginBottom: '6%',
          }}>
          나만의 레시피를 얻을 수 있어요!
        </Text>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.navigate('HomeScreen')}
          style={{
            ...styles.TextBox,
            marginVertical: '4%',
            borderRadius: 9,
          }}>
          <View>
            <Text
              style={{
                fontFamily: 'Happiness-Sans-Regular',
                color: 'white',
                fontSize: 17,
                fontWeight: '500',
                padding: 4,
              }}>
              홈에서 레시피 확인하기
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            // getData()
            navigation.navigate('Survey');
          }}
          style={{...styles.TextBox, borderRadius: 9}}>
          <View>
            <Text
              style={{
                fontFamily: 'Happiness-Sans-Regular',
                fontSize: 17,
                color: 'white',
                fontWeight: '500',
                padding: 4,
              }}>
              추가 조사해보기
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  CongratIcon: {
    marginTop: '30%',
    marginBottom: '7%',
    width: Width * 0.2,
    height: Width * 0.2,
  },
  TextBox: {
    backgroundColor: '#FFAAB3',
    paddingHorizontal: '3%',
    paddingVertical: '1.5%',
    borderRadius: 7,
  },
});

export default AfterSurvey;
