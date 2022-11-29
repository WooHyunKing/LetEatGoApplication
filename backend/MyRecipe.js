import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Button,
  Alert,
} from 'react-native';
import Topbar from '../Bar/Topbar';
import axios from 'axios';

import AsyncStorage from '@react-native-community/async-storage';

const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

function RecipeComponent({url, foodname}) {
  const [like, setLike] = useState(false);
  const [check, setCheck] = useState(false);

  return (
    <View
      style={{
        ...styles.box,
        height: Height * 0.2,
      }}>
      <View
        style={{
          flex: 0.9,
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}>
        <Image
          style={{
            width: Width * 0.4,
            height: Width * 0.32,
            borderRadius: 5,
            resizeMode: 'cover',
          }}
          source={{uri: url}}
        />
        <Text style={{fontSize: 18, marginLeft: Width * 0.03}}>{foodname}</Text>
      </View>
      <View
        style={{
          flex: 0.1,
          paddingRight: Width * 0.15,
          paddingTop: Height * 0.12,
        }}>
        <View style={{width: Width * 0.2, flexDirection: 'row-reverse'}}>
          <TouchableOpacity onPress={() => setCheck(!check)}>
            <Image
              source={
                check
                  ? require('../../android/app/assets/icons/Checked2.png')
                  : require('../../android/app/assets/icons/Check2.png')
              }
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setLike(!like)}>
            <Image
              source={
                like
                  ? require('../../android/app/assets/icons/Heart2.png')
                  : require('../../android/app/assets/icons/EmptyHeart2.png')
              }
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

function MyRecipe({navigation}) {
  const [active, setActive] = useState(true);
  const [userId, setUserId] = useState('yunmi123');
  const [nickname, setNickname] = useState('윰블리');
  const [likelist, setLikelist] = useState([]);
  const [checklist, setChecklist] = useState([]);

  const likeInfo = likelist.map(info => (
    <RecipeComponent url={info.Image} foodname={info.Name} />
  ));

  const checkInfo = checklist.map(info => (
    <RecipeComponent url={info.Image} foodname={info.Name} />
  ));

  async function getLike(user_id) {
    try {
      const response = await axios.get(
        `http://10.0.2.2:80/user/like?userid=${user_id}`,
      );
      console.log('here');
      // console.log(response.data.result);
      setLikelist(response.data.result);
    } catch (e) {
      console.log(e);
    }
  }

  async function getCheck(user_id) {
    try {
      const response = await axios.get(
        `http://10.0.2.2:80/user/made?userid=${user_id}`,
      );
      console.log('hi');
      console.log(response.data.result);
      setChecklist(response.data.result);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getLike(97);
    getCheck(97);
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Topbar navigation={navigation} />
      <View style={{flex: 1, paddingHorizontal: Width * 0.03}}>
        <View style={{flex: 0.3}}>
          <View style={{...styles.box, flexDirection: 'row'}}>
            <Image
              source={require('../../android/app/assets/icons/User_default.png')}
              style={{marginLeft: Width * 0.03}}
            />
            <View style={{marginLeft: Width * 0.02}}>
              <View
                style={{
                  flexDirection: 'row',
                  marginBottom: Height * 0.015,
                }}>
                <Text>{userId}</Text>
                <TouchableOpacity
                  style={styles.logoutButton}
                  onPress={() => {
                    Alert.alert('로그아웃 하시겠습니까?', '', [
                      {
                        text: '네',
                        onPress: () => {
                          AsyncStorage.removeItem('user_id');
                          navigation.replace('Auth');
                        },
                      },
                      {
                        text: '아니오',
                      },
                    ]);
                  }}>
                  <Text style={styles.logoutText}>로그아웃</Text>
                </TouchableOpacity>
              </View>
              <Text>{nickname}</Text>
            </View>
          </View>
        </View>
        <View style={{flex: 0.7}}>
          <View
            style={{
              flex: 0.1,
              flexDirection: 'row',
              justifyContent: 'space-evenly',
            }}>
            <TouchableOpacity
              style={{
                ...styles.block,
                backgroundColor: active ? '#FFCDD2' : '#F0F0F0',
              }}
              onPress={active ? null : () => setActive(!active)}>
              <Text>만들어 본 레시피</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                ...styles.block,
                backgroundColor: active ? '#F0F0F0' : '#FFCDD2',
              }}
              onPress={active ? () => setActive(!active) : null}>
              <Text>관심 있는 레시피</Text>
            </TouchableOpacity>
          </View>
          <ScrollView style={{flex: 0.9}}>
            {active ? likeInfo : checkInfo}
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    flex: 1,
    // paddingHorizontal: Width * 0.013,
    marginTop: Height * 0.012,
    marginBottom: Height * 0.012,
    backgroundColor: 'white',
    // marginHorizontal: Width * 0.018,
    borderWidth: 1.8,
    borderBottomRightRadius: 23,
    borderColor: '#FFCDD2',
    borderStyle: 'solid',
    shadowColor: '#FFAAB3',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 2,

    elevation: 1,
    // justifyContent: '',
    alignItems: 'center',
    paddingLeft: Width * 0.01,
    flexDirection: 'row',
  },
  block: {
    backgroundColor: '#FFCDD2',
    paddingTop: Height * 0.01,
    borderBottomRightRadius: 23,
    // marginBottom: Height * 0.006,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    width: Width * 0.46,
    elevation: 3,
  },
  logoutText: {
    fontSize: 12,
    color: '#FFCDD2',
    marginLeft: Width * 0.01,
    marginTop: Height * 0.003,
    textDecorationLine: 'underline',
  },
  icon: {
    marginLeft: Width * 0.015,
  },
});

export default MyRecipe;
