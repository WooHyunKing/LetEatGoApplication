import React, {useState} from 'react';
import {View, Text, Button, Image, StyleSheet, Dimensions} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import Topbar from '../Bar/Topbar';

const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

function Recipe({navigation}) {
  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [madeCount, setMadeCount] = useState(0);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Topbar navigation={navigation} />
      <View style={{flex: 0.55}}>
        <View style={{flex: 0.6, backgroundColor: 'red'}}></View>
        <View style={{flex: 0.15, backgroundColor: 'black'}}></View>
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
            <Text>조회수 164,344회</Text>
          </View>
        </View>
      </View>
      <View style={{flex: 0.45, backgroundColor: 'blue'}}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomButton: {
    height: Height * 0.05,
    backgroundColor: 'white',
    flexDirection: 'row',
    borderRadius: 20,
    width: Width * 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Width * 0.01,
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
    padding: 3,
  },
});

export default Recipe;
