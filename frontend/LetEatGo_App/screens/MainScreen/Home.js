import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
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
import numState from '../../recoils/numState';
import AsyncStorage from '@react-native-community/async-storage';
import {FadingTransition} from 'react-native-reanimated';
import {useIsFocused} from '@react-navigation/native';

const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

function Home({navigation, route}) {
  const [num, setNum] = useRecoilState(numState);
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
      <View style={styles.box}>
        <Text style={styles.top5_text}>Top5 레시피{num}</Text>
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
      </View>
      <View style={styles.box}>
        <Text style={styles.BeforeText}>내 취향에 맞는 레시피</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Survey')}>
          <Text style={styles.ButtonText}>찾아보기</Text>
        </TouchableOpacity>
      </View>
      <View style={{...styles.box, marginBottom: '5%'}}>
        {!finishMbti ? (
          <View>
            <Text style={styles.BeforeText}>나의 식습관 지표 MBTI</Text>
            <TouchableOpacity onPress={() => navigation.navigate('MbtiServey')}>
              <Text style={styles.ButtonText}>알아보기</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{alignItems: 'center'}}>
            <Text style={{fontSize: 25}}>
              나의 먹비티아이는 ? "{first}
              {second}
              {third}
              {fourth}-{fifth}"
            </Text>
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
              }}>
              <Text style={styles.ButtonText}>재검사 하기</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* <Text>{finishMbti ? 'true' : 'false'}</Text>
        <Text>{first}</Text>
        <Text>{second}</Text>
        <Text>{third}</Text>
        <Text>{fourth}</Text>
        <Text>{fifth}</Text> */}
      </View>
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
    // paddingRight: Width * 0.226,
  },
  box: {
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
    shadowColor: '#FFAAB3',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 2,

    elevation: 1,
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
