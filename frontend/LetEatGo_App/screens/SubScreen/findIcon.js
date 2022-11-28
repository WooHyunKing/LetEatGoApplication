import Category from '../SubScreen/categoryIndex';
import {Image, View, Text, StyleSheet, Dimensions} from 'react-native';
import React from 'react';

const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

function FindIcon(Props) {
  src = 0;
  if (Props.category == -1) {
    Category.map(item => {
      item.array.map(key => {
        if (Props.foodname.includes(key.foodname)) {
          src = key.src;
        }
      });
      if (src == 0) {
        src = require('../../android/app/assets/ingredients/none.png');
      }
    });
  } else {
    Category[Props.category].array.map(item => {
      if (item.foodname == Props.foodname) {
        src = item.src;
      }
    });
  }
  return <Image source={src} style={{...styles.ListImage}}></Image>;
}

const styles = StyleSheet.create({
  ListImage: {
    height: Height * 0.05,
    width: Height * 0.05,
    resizeMode: 'contain',
    paddingHorizontal: '12%',
  },
});
export default FindIcon;
