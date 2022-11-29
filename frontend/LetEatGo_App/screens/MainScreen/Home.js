import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {atom, useRecoilState} from 'recoil';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import {
  eCount,
  iCount,
  sCount,
  wCount,
  uCount,
  fCount,
  rCount,
  vCount,
  aCount,
  pCount,
} from '../../recoils/mbtiCount';
import Topbar from '../Bar/Topbar';

import AsyncStorage from '@react-native-community/async-storage';

import {FadingTransition} from 'react-native-reanimated';
import {useIsFocused} from '@react-navigation/native';

import BeforeRecommend from '../SubScreen/beforeRecomend';
import RecomRecipe from '../SubScreen/recomRecipe';
import IngreRecipe from '../SubScreen/ingreRecipe';

import userkey from '../../recoils/userKey';
import Survey2 from '../../recoils/survey';
import usernickname from '../../recoils/userNickname';

const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

function Home({navigation, route}) {
  const [survey, setSurvey] = useState(false);
  const [survey2, setSurvey2] = useRecoilState(Survey2);
  const [userResult, setuserResult] = useState();
  const [ingreResult, setIngreResult] = useState();
  const [KEY, setKey] = useRecoilState(userkey);
  const [userNickname, setUserNickName] = useRecoilState(usernickname);

  const [foodId, setFoodId] = useState(0);
  const [finishMbti, setFinishMbti] = useState(false);
  const [first, setFirst] = useState('');
  const [second, setSecond] = useState('');
  const [third, setThird] = useState('');
  const [fourth, setFourth] = useState('');
  const [fifth, setFifth] = useState('');

  const [eTemp, setETemp] = useRecoilState(eCount);
  const [iTemp, setITemp] = useRecoilState(iCount);
  const [sTemp, setSTemp] = useRecoilState(sCount);
  const [wTemp, setWTemp] = useRecoilState(wCount);
  const [uTemp, setUTemp] = useRecoilState(uCount);
  const [fTemp, setFTemp] = useRecoilState(fCount);
  const [rTemp, setRTemp] = useRecoilState(rCount);
  const [vTemp, setVTemp] = useRecoilState(vCount);
  const [aTemp, setATemp] = useRecoilState(aCount);
  const [pTemp, setPTemp] = useRecoilState(pCount);

  const isFocused = useIsFocused();

  const getUserR = async key => {
    try {
      const response = await axios.get(
        'http://10.0.2.2:80/',
        {
          params: {userid: 97},
        },
        {withCredentials: true},
      );
      if (response.data) {
        setuserResult(response.data.data[0]);
        setIngreResult(response.data.data[1]);
      }
    } catch (e) {
      console.error(e);
      console.log(JSON.stringify(e));
      return e;
    }
  };

  useEffect(() => {
    setSurvey2(false);
    getUserR();
  }, []);
  useEffect(() => {
    getUserR();
  }, [survey2]);
  useEffect(() => {
    AsyncStorage.getItem('one').then(value => {
      value !== null ? setFinishMbti(true) : null;
    });
    AsyncStorage.getItem('one').then(value => {
      setFirst(value);
    });
    AsyncStorage.getItem('two').then(value => {
      setSecond(value);
    });
    AsyncStorage.getItem('three').then(value => {
      setThird(value);
    });
    AsyncStorage.getItem('four').then(value => {
      setFourth(value);
    });
    AsyncStorage.getItem('five').then(value => {
      setFifth(value);
    });
  }, [isFocused]);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Topbar navigation={navigation} />
      <View>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '400',
            fontFamily: 'Happiness-Sans-Regular',
            marginVertical: Height * 0.01,
            marginLeft: Width * 0.02,
          }}>
          안녕하세요? {userNickname}님 🥘
        </Text>
        <Text
          style={{
            fontSize: 17,
            fontWeight: '400',
            fontFamily: 'Happiness-Sans-Regular',
            marginVertical: Height * 0.01,
            marginLeft: Width * 0.02,
          }}>
          {userNickname}님에게 꼭 맞는 레시피를 추천해드릴게요 :)
        </Text>
      </View>

      <ScrollView>
        {survey ? (
          <RecomRecipe
            text={'나의 입맛에 쏙 맞게 추천된 레시피에요!'}
            data={userResult}
          />
        ) : (
          <View style={styles.box}>
            <Text style={styles.BeforeText}>내 취향에 맞는 레시피</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Survey')}>
              <Text style={styles.ButtonText}>찾아보기</Text>
            </TouchableOpacity>
          </View>
        )}
        {survey2 ? (
          <IngreRecipe
            text={'내가 지금 만들 수 있는 레시피에요!'}
            data={ingreResult}
          />
        ) : (
          <View style={styles.box}>
            <Text style={styles.BeforeText}>
              나의 냉장고로 만들 수 있는 음식은?
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Refrigerator')}>
              <Text style={styles.ButtonText}>찾아보기</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* <View style={styles.box}>
          <Text style={styles.top5_text}>Top5 레시피</Text>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Recipe', {food_id: 777})}>
              <Image
                style={styles.image}
                source={require('../../android/app/assets/imgs/food1.jpeg')}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('Recipe', {food_id: 888})}>
              <Image
                style={styles.image}
                source={require('../../android/app/assets/imgs/food2.jpeg')}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Recipe')}>
              <Image
                style={styles.image}
                source={require('../../android/app/assets/imgs/food3.jpeg')}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Recipe')}>
              <Image
                style={styles.image}
                source={require('../../android/app/assets/imgs/food4.jpeg')}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Recipe')}>
              <Image
                style={styles.image}
                source={require('../../android/app/assets/imgs/food5.jpeg')}
              />
            </TouchableOpacity>
          </ScrollView>
        </View> */}

        <View style={{...styles.box, marginBottom: '5%'}}>
          {!finishMbti ? (
            <View>
              <Text style={styles.BeforeText}>나의 식습관 지표 MBTI</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('MbtiServey')}>
                <Text style={styles.ButtonText}>알아보기</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{alignItems: 'center'}}>
              <Text style={{fontSize: 25}}>나의 먹비티아이는 ?</Text>
              <Text
                style={{fontSize: 30, color: '#FFAAB3', fontWeight: 'bold'}}>
                "{first}
                {second}
                {third}
                {fourth}-{fifth}"
              </Text>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  onPress={() => {
                    setETemp(0);
                    setITemp(0);
                    setSTemp(0);
                    setWTemp(0);
                    setUTemp(0);
                    setFTemp(0);
                    setRTemp(0);
                    setVTemp(0);
                    setATemp(0);
                    setPTemp(0);
                    navigation.navigate('MbtiServey');
                  }}
                  style={{marginHorizontal: Width * 0.01}}>
                  <Text style={styles.ButtonText}>재검사 하기</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate('MbtiResult')}
                  style={{marginHorizontal: Width * 0.01}}>
                  <Text style={styles.ButtonText}>검사결과 보기</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  statusBarPlaceholder: {
    backgroundColor: '#FFCDD2',
  },
  block: {
    backgroundColor: '#FFCDD2',
    paddingVertical: Height * 0.0146,
    borderBottomRightRadius: 23,
    marginBottom: Height * 0.006,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: '900',
    color: 'white',
    fontFamily: 'Happiness-Sans-Bold',
  },
  box: {
    height: Height * 0.22,
    flex: 1,
    paddingHorizontal: Width * 0.013,
    marginTop: Height * 0.012,
    marginBottom: Height * 0.012,
    backgroundColor: 'white',
    marginHorizontal: Width * 0.018,
    borderWidth: 1.8,
    borderBottomRightRadius: 23,
    borderColor: '#FFCDD2',
    borderStyle: 'solid',

    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  BeforeText: {
    fontWeight: '900',
    fontSize: 20,
    fontFamily: 'Cafe24Ssurround',
    paddingBottom: '1%',
  },
  ButtonText: {
    fontWeight: '700',
    fontSize: 18,
    fontFamily: 'Cafe24Ssurround',
    color: 'white',
    backgroundColor: '#FFAAB3',
    paddingHorizontal: '3%',
    paddingVertical: '1.5%',
    borderRadius: 7,
  },

  TextBox: {
    backgroundColor: '#FFAAB3',
    paddingHorizontal: '3%',
    paddingVertical: '1.5%',
    borderRadius: 7,
  },
  StatusBarIcon: {
    position: 'absolute',
    flexDirection: 'row',
    right: Width * 0.03,
    top: Height * 0.015,
  },
  image: {
    height: Height * 0.15,
    width: Height * 0.15,
    marginHorizontal: Width * 0.01,
    marginBottom: Height * 0.04,
    borderBottomRightRadius: 13,
  },
  top5_text: {
    fontFamily: 'Happiness-Sans-Bold',
    fontWeight: '900',
    fontSize: 19,
    marginTop: Height * 0.017,
    marginBottom: Height * 0.017,
    // paddingLeft: "35%",
  },
});

export default Home;
