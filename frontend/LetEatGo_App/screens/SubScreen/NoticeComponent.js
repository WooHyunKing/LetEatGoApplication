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

const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

function NoticeComponent({message, date}) {
  return (
    <View style={styles.postStyle}>
      <Image
        style={{
          width: Width * 0.13,
          height: Width * 0.13,
          borderRadius: 50,
          // marginTop: Height * 0.025,
          marginLeft: Width * 0.03,
        }}
        source={require('../../android/app/assets/icons/app_logo.png')}
      />
      <View
        style={{
          marginLeft: Width * 0.025,
        }}>
        <Text
          style={{
            fontSize: 14,
            marginBottom: Height * 0.005,
            color: 'black',
            flexWrap: 'wrap',
            width: Width * 0.7,
          }}>
          {message}
        </Text>

        <Text
          style={{
            marginLeft: Width * 0.003,
            fontSize: 12,
            color: 'grey',
          }}>
          {date} 전
        </Text>
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
  iconText: {
    backgroundColor: '#FFA5A5',
    borderRadius: 15,
    width: Width * 0.15,
    height: Height * 0.026,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: Width * 0.01,
  },
});

export default NoticeComponent;
