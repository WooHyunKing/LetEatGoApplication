import {createStackNavigator} from '@react-navigation/stack';
import React, {useState} from 'react';
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

import Topbar from '../Bar/Topbar';
import numState from '../../recoils/numState';

const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

function Home({navigation, route}) {
  const [num, setNum] = useRecoilState(numState);
  const [foodId, setFoodId] = useState(0);

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

          <TouchableOpacity onPress={() => navigation.navigate('Recipe')}>
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
        <Text style={styles.BeforeText}>나의 식습관 지표 MBTI</Text>
        <TouchableOpacity onPress={() => navigation.navigate('MBTI')}>
          <Text style={styles.ButtonText}>알아보기</Text>
        </TouchableOpacity>
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
