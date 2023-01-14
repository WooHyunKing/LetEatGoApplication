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
  Alert,
} from 'react-native';
import Topbar from '../Bar/Topbar';
import userid from '../../recoils/userId';
import userkey from '../../recoils/userKey';
import {useRecoilState} from 'recoil';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

function Withdraw({navigation}) {
  const [id, setId] = useRecoilState(userid);
  const [index, setIndex] = useRecoilState(userkey);

  async function deleteUser() {
    try {
      const response = await axios.delete(
        `http://3.34.153.73:8081/user/withdraw?userid=${index}`,
      );
      console.log(response.config);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Topbar />
      <View
        style={{
          flex: 1,
          paddingHorizontal: Width * 0.08,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            fontSize: 30,
            fontFamily: 'GangwonEduAllBold',
            // marginTop: Height * 0.04,
            marginBottom: Height * 0.03,
          }}>
          계정 {id}을(를) 삭제 하시겠습니까?
        </Text>
        <Text
          style={{
            fontSize: 18,
            color: 'grey',
            fontFamily: 'GangwonEduAllLight',
            marginBottom: Height * 0.025,
          }}>
          탈퇴 시 삭제되는 계정 및 유저 정보는 복구가 불가능합니다.
        </Text>

        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 7,
            width: '100%',
            height: Height * 0.07,
            marginTop: Height * 0.05,
            backgroundColor: '#FFAAB3',
          }}
          onPress={() => {
            Alert.alert('정말로 탈퇴 하시겠습니까?', '', [
              {
                text: '네',
                onPress: () => {
                  AsyncStorage.clear();
                  deleteUser();
                  navigation.replace('Auth');
                },
              },
              {
                text: '아니오',
              },
            ]);
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 20,
              fontFamily: 'GangwonEduAllLight',
            }}>
            탈퇴하기
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Withdraw;
