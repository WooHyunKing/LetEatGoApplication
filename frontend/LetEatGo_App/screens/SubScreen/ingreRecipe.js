import React, {useState} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
import Slick from 'react-native-slick';
import Top5Image from './Top5';

import axios from 'axios';

import {useRecoilState} from 'recoil';
import foodid from '../../recoils/foodid';
import recipename from '../../recoils/recipename';

const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

function IngreRecipe(Props) {
  const [FoodId, setFoodId] = useRecoilState(foodid);
  const [RecipeName, setRecipename] = useRecoilState(recipename);
  console.log(Props.data);
  return (
    <View style={{...styles.HomeBox, height: Height * 0.33}}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.InBoxtext}>{Props.text}</Text>
        <Slick
          loadMinimalLoader={<ActivityIndicator />}
          autoplay
          dotStyle={{
            backgroundColor: '#F0F0F0',
          }}
          activeDotStyle={{
            backgroundColor: '#FFAAB3',
          }}
          paginationStyle={{bottom: 3}}>
          {Props.data === undefined ? (
            <ActivityIndicator />
          ) : (
            Props.data.map((key, index) => (
              <TouchableOpacity
                activeOpacity={0.7}
                key={index}
                onPress={() => {
                  setFoodId(Props.data[index].foodid);
                  setRecipename(Props.data[index].Name);
                  Props.navigation.navigate('Recipe');
                }}>
                <View style={{alignItems: 'center'}}>
                  <Image
                    Key={index}
                    style={styles.image}
                    source={{uri: Props.data[index].Image}}
                  />

                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: 'Happiness-Sans-Regular',
                    }}>
                    {Props.data[index].Name}
                  </Text>
                </View>
              </TouchableOpacity>
            ))
          )}
        </Slick>
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
  },
  InBoxtext: {
    fontFamily: 'Happiness-Sans-Bold',
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
});
export default IngreRecipe;
