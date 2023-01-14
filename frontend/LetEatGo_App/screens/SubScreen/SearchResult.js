import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useRecoilState} from 'recoil';
import {
  View,
  StatusBar,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Topbar from '../Bar/Topbar';

import searchresult from '../../recoils/searchWord';
import foodid from '../../recoils/foodid';
import searchtext from '../../recoils/keyword';
import recipename from '../../recoils/recipename';

function SearchResult({navigation}) {
  const [text, setText] = useRecoilState(searchtext);
  const [FoodId, setFoodId] = useRecoilState(foodid);
  const [RecipeName, setRecipename] = useRecoilState(recipename);
  const [searchResult, setResult] = useRecoilState(searchresult);

  const onChangeText = payload => {
    sendWord(payload);
    setText(payload);
  };

  const addHistory = async () => {
    sendWord(text);

    navigation.navigate('SearchResult');

    setText('');
  };

  const sendWord = async key => {
    try {
      const response = await axios.get(
        'http://3.34.153.73:8081/search/keyword',
        {
          params: {key: key},
        },
        {withCredentials: true},
      );
      console.log('search Keyword');
      console.log(key);
      setResult(response.data.result);

      console.log('search result');
      console.log(response.data.result);
    } catch (e) {
      console.error(e);
      console.log(JSON.stringify(e));
      return e;
    }
  };

  return (
    <View>
      <Topbar navigation={navigation} />
      <Text
        style={{
          paddingLeft: '5%',
          fontSize: 17,
          fontFamily: 'Happiness-Sans-regular',
          marginVertical: 20,
        }}>
        검색결과
      </Text>
      <ScrollView style={{marginLeft: 10}}>
        {searchResult.length ? (
          searchResult.map((key, index) => (
            <View key={index} style={{padding: 7}}>
              <TouchableOpacity
                activeOpacity={0.3}
                style={{flexDirection: 'row', maxWidth: '65%'}}
                onPress={() => {
                  setFoodId(key.foodid);
                  setRecipename(key.Name);
                  navigation.navigate('Recipe');
                  // setResult([]);
                  setText('');
                }}>
                <Image
                  style={{
                    height: 80,
                    width: 80,
                    borderRadius: 5,

                    marginRight: 10,
                  }}
                  source={{uri: key.Image}}></Image>

                <Text
                  style={{
                    fontSize: 16,
                    marginTop: 27,
                    padding: 3,
                    marginLeft: 5,
                    fontWeight: '500',
                    fontFamily: 'Happiness-Sans-regular',
                  }}
                  key={index}>
                  {key.Name}
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  width: '97%',
                  borderWidth: 1,

                  marginTop: 13,
                  borderColor: '#F1F1F1',
                }}></View>
            </View>
          ))
        ) : (
          <Text
            style={{
              fontSize: 16,
              fontWeight: '400',
              padding: 3,
              marginLeft: 100,
              marginTop: 70,
              fontFamily: 'Happiness-Sans-regular',
            }}>
            검색결과가 없습니다.
          </Text>
        )}
      </ScrollView>
    </View>
  );
}

export default SearchResult;
