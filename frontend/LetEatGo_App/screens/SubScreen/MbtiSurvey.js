import React from 'react';
import {
  View,
  Text,
  Button,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Topbar from '../Bar/Topbar';
import MbtiSurveyComponent from './MbtiSurveyComponent';
import {atom, useRecoilState} from 'recoil';
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
import AsyncStorage from '@react-native-community/async-storage';

const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

const Question = [
  {
    type: 'E',
    text: '식사를 하면서 대화하는 것을 좋아한다.',
  },
  {
    type: 'E',
    text: '혼자 식사하는 것보다 친구나 가족과 식사하는 것을 선호한다.',
  },
  {
    type: 'I',
    text: '대체적으로 혼자 식사하는 것이 편하다.',
  },
  {
    type: 'I',
    text: '혼자서 밥을 해먹는 경우가 많다.',
  },
  {
    type: 'S',
    text: '운동을 규칙적으로 하는 편이다.',
  },
  {
    type: 'S',
    text: '대체적으로 수면 시간이 규칙적인 편이다.',
  },
  {
    type: 'W',
    text: '하루에 물을 자주 마시진 않는다.',
  },
  {
    type: 'W',
    text: '일주일에 술을 3회 이상 마신다.',
  },
  {
    type: 'U',
    text: '자극적인 음식을 즐겨먹는 편이다.',
  },
  {
    type: 'U',
    text: '편식하는 음식이 5개 이상 존재한다.',
  },
  {
    type: 'F',
    text: '식사를 할 때 영양소나 성분을 확인하는 편이다.',
  },
  {
    type: 'F',
    text: '탄수화물, 단백질, 지방 비율을 고려한다.',
  },
  {
    type: 'R',
    text: '과식하지 않도록 적정량에 맞춰 식사한다.',
  },
  {
    type: 'R',
    text: '매일 식사하는 시간이 정해져 있다.',
  },
  {
    type: 'V',
    text: '하루에 식사를 하는 횟수가 자주 바뀐다.',
  },
  {
    type: 'V',
    text: '식사를 거르는 경우가 많다.',
  },
  {
    type: 'A',
    text: '매끼 골고루 식사를 하며 편식을 하지 않는다.',
  },
  {
    type: 'A',
    text: '맛집을 탐방하는 취미가 있다.',
  },
  {
    type: 'P',
    text: '음식을 남기는 경우가 많다.',
  },
  {
    type: 'P',
    text: '항상 해먹던 음식만 요리한다.',
  },
];

function MbtiSurvey({navigation}) {
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

  const questionList = Question.map(question => (
    <MbtiSurveyComponent
      key={question.text}
      text={question.text}
      type={question.type}
    />
  ));

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Topbar navigation={navigation} />
      <ScrollView
        contentContainerStyle={{alignItems: 'center'}}
        style={{flex: 1, backgroundColor: 'white'}}>
        <Image
          style={{width: Width * 1, height: Height * 0.35, borderRadius: 10}}
          source={require('../../android/app/assets/imgs/MbtiTop.png')}
          resizeMode="stretch"
        />
        {/* <Text>E : {eTemp}</Text>
        <Text>I : {iTemp}</Text>
        <Text>S : {sTemp}</Text>
        <Text>W : {wTemp}</Text>
        <Text>U : {uTemp}</Text>
        <Text>F : {fTemp}</Text> */}
        {questionList}
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => {
            AsyncStorage.setItem('one', eTemp >= iTemp ? eTemp : iTemp);
            AsyncStorage.setItem('two', sTemp >= wTemp ? sTemp : wTemp);
            AsyncStorage.setItem('three', uTemp >= fTemp ? uTemp : fTemp);
            AsyncStorage.setItem('four', rTemp >= vTemp ? rTemp : vTemp);
            AsyncStorage.setItem('five', aTemp >= pTemp ? aTemp : pTemp);
          }}>
          <Text style={{color: '#706d6d'}}>제출</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  submitButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: Width * 0.8,
    height: Height * 0.07,
    backgroundColor: '#FFCDD2',
    borderRadius: 10,
    marginTop: Height * 0.03,
    marginBottom: Height * 0.05,
  },
});

export default MbtiSurvey;
