import React, {useState} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Slick from 'react-native-slick';
import axios from 'axios';

import Top5Image from './Top5';

import {useRecoilState} from 'recoil';
import foodid from '../../recoils/foodid';
import recipename from '../../recoils/recipename';

const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

function RecomRecipe(Props) {
  const [FoodId, setFoodId] = useRecoilState(foodid);
  const [RecipeName, setRecipename] = useRecoilState(recipename);
  console.log(Props.data);
  return (
    <View style={{...styles.HomeBox, height: Height * 0.33}}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.InBoxtext}>{Props.text}</Text>
        <ScrollView
          pagingEnabled
          horizontal
          showsHorizontalScrollIndicator={false}>
          {Props.data === undefined ? (
            <ActivityIndicator />
          ) : (
            Props.data.map((key, index) => (
              <TouchableOpacity
                activeOpacity={0.7}
                key={index}
                onPress={() => {
                  setFoodId(Props.data[index].foodid);
                  setRecipename(Props.data[index].name);
                  Props.navigation.navigate('Recipe');
                }}>
                <View style={{alignItems: 'center'}}>
                  <Image
                    Key={index}
                    style={styles.image2}
                    source={{uri: Props.data[index].image}}
                  />

                  <Text
                    style={{
                      fontSize: 15,
                      fontFamily: 'Happiness-Sans-Regular',
                    }}>
                    {Props.data[index].name}
                  </Text>
                </View>
              </TouchableOpacity>
            ))
          )}
        </ScrollView>
        <View style={{...styles.TextBox, marginBottom: 8}}>
          <TouchableOpacity onPress={() => Props.navigation.navigate('Survey')}>
            <Text style={{...styles.ButtonText}}>추가검사 해보기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  HomeBox: {
    flex: 1,
    width: Width * 0.95,
    marginTop: Height * 0.012,
    marginBottom: Height * 0.012,
    backgroundColor: 'white',
    borderWidth: 1.8,
    borderBottomRightRadius: 23,
    borderColor: '#FFCDD2',
    borderStyle: 'solid',
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
    // marginLeft: 10,
  },
  InBoxtext: {
    fontFamily: 'GangwonEduAllBold',
    fontWeight: '900',
    fontSize: 18,
    marginTop: Height * 0.017,
    marginBottom: Height * 0.02,
  },
  image: {
    height: Height * 0.2,
    width: Height * 0.27,
    marginHorizontal: Width * 0.01,
    resizeMode: 'cover',
    marginBottom: Height * 0.015,
    borderRadius: 10,
  },
  image2: {
    height: Height * 0.13,
    width: Height * 0.13,
    marginHorizontal: Width * 0.015,
    resizeMode: 'cover',
    marginBottom: Height * 0.015,
    borderRadius: 10,
  },
  TextBox: {
    backgroundColor: '#FFAAB3',
    paddingHorizontal: '3%',
    paddingVertical: '1.5%',
    borderRadius: 7,
  },
  ButtonText: {
    fontWeight: '700',
    fontSize: 18,
    fontFamily: 'GangwonEduAllBold',
    color: 'white',
  },
});
export default RecomRecipe;
