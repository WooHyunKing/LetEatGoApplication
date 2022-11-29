import React from 'react';
import {
  View,
  Text,
  Button,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import Topbar from '../Bar/Topbar';
import Home from '../MainScreen/Home';
import NoticeComponent from './NoticeComponent';

const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

function Notice({navigation}) {
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <Topbar navigation={navigation} />
      <View style={{flex: 1, paddingHorizontal: Width * 0.02}}>
        <Text
          style={{
            fontSize: 25,
            marginLeft: Width * 0.02,
            marginVertical: Height * 0.02,
            color: 'black',
          }}>
          내 알림 🔔
        </Text>
        <ScrollView style={{flex: 1}}>
          <NoticeComponent
            message={'회원님만의 새로운 레시피가 업데이트 되었어요 🥕'}
            date={'3일'}
          />

          <NoticeComponent
            message={'이번 달에 가장 인기 있던 요리들을 확인해보세요 🧆'}
            date={'3주'}
          />
          <NoticeComponent
            message={'(광고) 떡순이들을 위한 다이어트 필수템 💪🏻'}
            date={'1개월'}
          />
          <View style={styles.postStyle}></View>
          <View style={styles.postStyle}></View>
          <View style={styles.postStyle}></View>
          <View style={styles.postStyle}></View>
          <View style={styles.postStyle}></View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  postStyle: {
    borderRadius: 10,
    height: Height * 0.12,
    backgroundColor: '#FFFFFF',
    elevation: 3,
    margin: 7,
    marginVertical: Height * 0.005,
    alignItems: 'center',
    flexDirection: 'row',
  },
  fontStyle: {
    fontSize: 28,
    marginBottom: Height * 0.03,
  },
  postButton: {
    width: Width * 0.2,
    height: Height * 0.05,
    borderWidth: 0.3,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Height * 0.007,
  },
});

export default Notice;
