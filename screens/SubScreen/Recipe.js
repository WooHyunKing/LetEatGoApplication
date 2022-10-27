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
        <ScrollView style={{padding: Width * 0.03}}>
          <View style={{flex: 0.45}}>
            <Text style={{color: '#FFCDD2'}}>식재료</Text>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={require('../../android/app/assets/Ingredient/chicken.png')}
                style={styles.icon}
              />
              <Image
                source={require('../../android/app/assets/Ingredient/sausage.png')}
                style={styles.icon}
              />

              <Image
                source={require('../../android/app/assets/Ingredient/meatball.png')}
                style={styles.icon}
              />
              <Image
                source={require('../../android/app/assets/Ingredient/ramen.png')}
                style={styles.icon}
              />
            </View>
          </View>
          <View style={{flex: 1}}>
            <Text style={{color: '#FFCDD2'}}>조미료</Text>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={require('../../android/app/assets/Ingredient/sesame_oil.png')}
                style={styles.icon}
              />
              <Image
                source={require('../../android/app/assets/Ingredient/soy_sauce.png')}
                style={styles.icon}
              />
            </View>
          </View>
          <View style={{flex: 0.1}}>
            <Text style={{color: '#FFCDD2'}}>레시피</Text>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={require('../../android/app/assets/icons/1.png')}
                style={styles.texticon}
              />
              <Text style={{marginTop: Width * 0.04}}>
                양파는 채썰고 슬라이스햄은 먹기 좋은 크기로 썰어줍니다.
              </Text>
            </View>

            <View style={{flexDirection: 'row'}}>
              <Image
                source={require('../../android/app/assets/icons/2.png')}
                style={styles.texticon}
              />
              <Text style={{marginTop: Width * 0.04}}>
                끓는 물에 면을 먼저 데쳐줍니다. 이때 면은 완전히 삶는 것이 아닌
                면이 살짝 풀어질 정도로만 데리고, 데친 면은 찬물에 담가 면이
                불지 않도록 식혀주세요.
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={require('../../android/app/assets/icons/3.png')}
                style={styles.texticon}
              />
              <Text style={{marginTop: Width * 0.04}}>
                달궈진 팬에 오일을 두르고 슬라이스햄과 다진마늘, 채썬 양파를
                약불에서 5분간 볶아주세요.
              </Text>
            </View>
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
    marginRight: Width * 0.07,
  },
  texticon: {
    height: Height * 0.02,
    width: Width * 0.02,
    margin: Width * 0.04,
  },
});
``;

export default Recipe;
