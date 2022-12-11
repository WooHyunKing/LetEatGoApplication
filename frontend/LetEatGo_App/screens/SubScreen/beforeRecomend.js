import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
// import styles from '../style';
// import {useNavigation} from '@react-navigation/native';
import {Dimensions} from 'react-native';

const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

function BeforeRecommend(Props) {
  const location = Props.location;

  return (
    <View style={{...styles.HomeBox, height: Height * 0.2}}>
      <View>
        <Text style={styles.BeforeText}>{Props.title}</Text>
      </View>
      <TouchableOpacity
        activeOpacity={0.65}
        onPress={() => Props.navigation.navigate(location)}>
        <View style={styles.TextBox}>
          <Text style={styles.ButtonText}>{Props.button}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  BeforeText: {
    fontSize: 24,

    fontFamily: 'GangwonEduAllBold',
    paddingBottom: '2%',
  },
  HomeBox: {
    width: '95%',
    height: Height * 0.22,
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

    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  TextBox: {
    backgroundColor: '#FFAAB3',
    paddingHorizontal: '3%',
    paddingVertical: '1.5%',
    borderRadius: 7,
  },
  ButtonText: {
    // fontWeight: '700',
    fontSize: 18,
    fontFamily: 'GangwonEduAllLight',
    color: 'white',
    backgroundColor: '#FFAAB3',
    paddingHorizontal: '3%',
    // paddingVertical: '1.5%',
    borderRadius: 7,
  },
});
export default BeforeRecommend;
