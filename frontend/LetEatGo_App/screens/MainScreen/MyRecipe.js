import React, {useCallback, useEffect, useState} from 'react';
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
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import userkey from '../../recoils/userKey';
import userid from '../../recoils/userId';
import foodid from '../../recoils/foodid';
import recipename from '../../recoils/recipename';
import usernickname from '../../recoils/userNickname';
import click from '../../recoils/mypagePut';
import AsyncStorage from '@react-native-community/async-storage';

import {useIsFocused} from '@react-navigation/native';
import {useRecoilState} from 'recoil';

const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

function RecipeComponent(Props) {
  const [FoodId, setFoodId] = useRecoilState(foodid);
  const [RecipeName, setRecipename] = useRecoilState(recipename);
  const [like, setLike] = useState(Props.like);
  const [check, setCheck] = useState(Props.check);
  const [KEY, setKEY] = useRecoilState(userkey);

  async function putLike(Like, foodid) {
    console.log(Like);

    try {
      const response = await axios.put('http://10.0.2.2:80/user/like/update', {
        favorite: Like,
        foodid: foodid,
        userid: KEY,
      });
    } catch (e) {
      console.log(e);
    }
  }
  async function putMade(Made, foodid) {
    console.log(Made);
    try {
      const response = await axios.put('http://10.0.2.2:80/user/made/update', {
        made: Made,
        foodid: foodid,
        userid: KEY,
      });
    } catch (e) {
      console.log(e);
    }
  }

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
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            setFoodId(Props.foodid);
            setRecipename(Props.Name);
            Props.navigation.navigate('Recipe');
          }}>
          <Image
            style={{
              width: Width * 0.4,
              height: Width * 0.32,
              borderRadius: 5,
              resizeMode: 'cover',
            }}
            source={{uri: Props.src}}
          />
        </TouchableOpacity>

        <Text style={{fontSize: 18, marginLeft: Width * 0.03}}>
          {Props.Name}
        </Text>
      </View>
      <View
        style={{
          flex: 0.1,
          paddingRight: Width * 0.15,
          paddingTop: Height * 0.12,
        }}>
        <View style={{width: Width * 0.2, flexDirection: 'row-reverse'}}>
          <TouchableOpacity
            onPress={() => {
              setCheck(!check);
              putMade(!check, Props.foodid);
            }}>
            <Image
              source={
                check
                  ? require('../../android/app/assets/icons/Checked2.png')
                  : require('../../android/app/assets/icons/Check2.png')
              }
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setLike(!like);
              putLike(!like, Props.foodid);
            }}>
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
  const [userId, setUserId] = useRecoilState(userid);
  const [nickname, setNickname] = useRecoilState(usernickname);
  const [active, setActive] = useState(true);
  const [likelist, setLikelist] = useState([]);
  const [checklist, setChecklist] = useState([]);
  const [KEY, setKEY] = useRecoilState(userkey);
  const [imgUrl, setImgUrl] = useState('');

  const isFocused = useIsFocused();

  const onSelectImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 512,
        maxHeight: 512,
        includeBase64: Platform.OS === 'android',
      },
      res => {
        console.log(res.assets[0].uri);
        // if (res.didCancel) return;
        setImgUrl(res.assets[0].uri);
        console.log('img come');
        console.log(imgUrl);
      },
    );
  };

  function doubleCheck(foodid, made) {
    check = false;
    made.map(key => {
      if (key.foodid == foodid) {
        check = true;
      }
    });
    return check;
  }

  async function getLike(user_id) {
    try {
      const response = await axios.get(
        `http://10.0.2.2:80/user/like?userid=${user_id}`,
      );
      console.log('here');
      console.log(response.data.result);
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
    getLike(KEY);
    getCheck(KEY);
  }, [isFocused]);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Topbar navigation={navigation} />
      <View style={{flex: 1, paddingHorizontal: Width * 0.03}}>
        <View style={{flex: 0.3}}>
          <View style={{...styles.box, flexDirection: 'row'}}>
            <TouchableOpacity onPress={onSelectImage}>
              <Image
                // source={require('../../android/app/assets/icons/User_default.png')}
                source={
                  imgUrl == ''
                    ? require('../../android/app/assets/icons/User_default.png')
                    : {uri: imgUrl}
                }
                style={{
                  marginLeft: Width * 0.03,
                  width: Width * 0.3,
                  height: Width * 0.3,
                  borderRadius: 100,
                }}
              />
            </TouchableOpacity>

            <View style={{marginLeft: Width * 0.02}}>
              <View
                style={{
                  flexDirection: 'row',
                  marginBottom: Height * 0.015,
                }}>
                <Text>{nickname}</Text>
                <TouchableOpacity
                  style={styles.logoutButton}
                  onPress={() => {
                    Alert.alert('로그아웃 하시겠습니까?', '', [
                      {
                        text: '네',
                        onPress: () => {
                          AsyncStorage.removeItem('user_id');
                          AsyncStorage.removeItem('USERNICKNAME');
                          AsyncStorage.removeItem('KEY');
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
              <Text>{userId}</Text>
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
              onPress={
                active
                  ? null
                  : () => {
                      setActive(!active);
                      getLike(KEY);
                    }
              }>
              <Text>만들어 본 레시피</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                ...styles.block,
                backgroundColor: active ? '#F0F0F0' : '#FFCDD2',
              }}
              onPress={
                active
                  ? () => {
                      setActive(!active);
                      getCheck(KEY);
                    }
                  : null
              }>
              <Text>관심 있는 레시피</Text>
            </TouchableOpacity>
          </View>
          <ScrollView style={{flex: 0.9}}>
            {active
              ? checklist.map((key, index) =>
                  doubleCheck(key.foodid, likelist) === true ? (
                    <RecipeComponent
                      key={index}
                      src={key.Image}
                      Name={key.Name}
                      foodid={key.foodid}
                      like={true}
                      check={true}
                      navigation={navigation}
                    />
                  ) : (
                    <RecipeComponent
                      key={index}
                      src={key.Image}
                      Name={key.Name}
                      foodid={key.foodid}
                      like={false}
                      check={true}
                      navigation={navigation}
                    />
                  ),
                )
              : likelist.map((key, index) =>
                  doubleCheck(key.foodid, checklist) === true ? (
                    <RecipeComponent
                      key={index + 2000}
                      src={key.Image}
                      Name={key.Name}
                      foodid={key.foodid}
                      like={true}
                      check={true}
                      navigation={navigation}
                    />
                  ) : (
                    <RecipeComponent
                      key={index + 2000}
                      src={key.Image}
                      Name={key.Name}
                      foodid={key.foodid}
                      like={true}
                      check={false}
                      navigation={navigation}
                    />
                  ),
                )}
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
