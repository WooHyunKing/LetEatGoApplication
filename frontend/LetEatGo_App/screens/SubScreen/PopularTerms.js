import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useRecoilState} from 'recoil';
import {View, Text, TouchableOpacity} from 'react-native';

// 나중에 userId 얻어와서 저장
import foodid from '../../recoils/foodid';
import recipename from '../../recoils/recipename';

function PopularTerms(Props) {
  const [FoodId, setFoodId] = useRecoilState(foodid);
  const [RecipeName, setRecipename] = useRecoilState(recipename);
  return (
    <View style={{flexDirection: 'row', marginVertical: '5%'}}>
      <Text
        style={{
          paddingHorizontal: '7%',
          fontFamily: 'Roboto-Bold',
          fontStyle: 'italic',
          fontWeight: '900',
          color: '#FFAAB3',
          fontSize: 28,
        }}>
        {Props.rank}
      </Text>
      <TouchableOpacity
        style={{paddingVertical: '1%'}}
        activeOpacity={0.7}
        onPress={() => {
          setFoodId(Props.FoodId);
          setRecipename(Props.keyWord);
          Props.navigation.navigate('Recipe');
        }}>
        <Text
          style={{
            fontFamily: 'Happiness-Sans-Regular',
            fontSize: 20,
          }}>
          {Props.keyWord}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
export default PopularTerms;
