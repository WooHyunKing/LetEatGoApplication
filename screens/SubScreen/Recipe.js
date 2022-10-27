import React, {useState} from 'react';
import {View, Text, Button, Image, StyleSheet, Dimensions} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';

import Topbar from '../Bar/Topbar';

const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

function Recipe({navigation}) {
  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [madeCount, setMadeCount] = useState(0);
  const [view, setView] = useState(174334);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Topbar navigation={navigation} />
      <View style={{flex: 0.55, padding: 5}}>
        <View style={{flex: 0.6}}>
          <Image
            source={require('../../android/app/assets/imgs/recipeImage.jpeg')}
            style={{width: '100%', height: '100%'}}
          />
        </View>
        <View style={{flex: 0.15, padding: 5, flexDirection: 'row'}}>
          <TouchableOpacity style={styles.topButton}>
            <Text style={styles.topButtonText}>인트로</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.topButton}>
            <Text style={styles.topButtonText}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.topButton}>
            <Text style={styles.topButtonText}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.topButton}>
            <Text style={styles.topButtonText}>3</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.topButton}>
            <Text style={styles.topButtonText}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.topButton}>
            <Text style={styles.topButtonText}>5</Text>
          </TouchableOpacity>
        </View>
        <View style={{flex: 0.35}}>
          <Text style={styles.text}>
            [ASMR MUKBANG] 직접 만든 떡볶이 불닭볶음면 양념 치킨먹방! & 레시피
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 5,
            }}>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity style={styles.bottomButton}>
                <Image
                  source={require('../../android/app/assets/icons/EmptyHeart.png')}
                />
                <Text style={styles.bottomButtonText}>{likeCount}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.bottomButton}>
                <Image
                  source={require('../../android/app/assets/icons/Checked.png')}
                />
                <Text style={styles.bottomButtonText}>{madeCount}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.bottomButton}>
                <Image
                  source={require('../../android/app/assets/icons/Share.png')}
                />
                <Text style={styles.bottomButtonText2}>공유하기</Text>
              </TouchableOpacity>
            </View>
            <Text>
              조회수{' '}
              {view.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}
              회
            </Text>
          </View>
        </View>
      </View>
      <View style={{flex: 0.45}}>
        <ScrollView style={{padding: 10}}>
          <View style={{flex: 0.45}}>
            <Text>식재료</Text>
            <View>
              <Image
                source={require('../../android/app/assets/Ingredient/chicken.png')}
                style={styles.icon}
              />
            </View>
          </View>
          <View style={{flex: 1}}>
            <Text>조미료</Text>
            <View>
              <Image
                source={require('../../android/app/assets/Ingredient/sesame_oil.png')}
                style={styles.icon}
              />
            </View>
          </View>
          <View style={{flex: 0.1}}>
            <Text>레시피</Text>
            <Image
              source={require('../../android/app/assets/Ingredient/sesame_oil.png')}
              style={styles.icon}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topButton: {
    height: Height * 0.05,
    backgroundColor: 'white',
    flexDirection: 'row',
    borderRadius: 20,
    width: Width * 0.15,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Width * 0.01,
    elevation: 1,
  },
  bottomButton: {
    height: Height * 0.05,
    backgroundColor: 'white',
    flexDirection: 'row',
    borderRadius: 20,
    width: Width * 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Width * 0.01,
    elevation: 1,
  },
  bottomButtonText: {
    fontSize: 19,
    backgroundColor: 'white',
    marginLeft: 5,
  },
  bottomButtonText2: {
    fontSize: 13,
    backgroundColor: 'white',
    marginLeft: 5,
  },
  image: {
    height: Height * 0.15,
    width: Height * 0.15,
  },
  text: {
    fontSize: 17,
    fontWeight: '900',
    padding: 5,
  },
  topButtonText: {
    fontSize: 14,
    backgroundColor: 'white',
    marginLeft: 5,
  },
  iconArea: {
    backgroundColor: 'white',
    height: Height * 0.12,
    width: Width * 0.12,
  },
  icon: {
    height: Height * 0.12,
    width: Width * 0.12,
  },
});

export default Recipe;
