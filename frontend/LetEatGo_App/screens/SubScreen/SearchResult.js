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
}
