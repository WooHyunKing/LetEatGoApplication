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
        onPress={() => (
          Props.setSurvey(true), Props.navigation.navigate(location)
        )}>
        <View style={styles.TextBox}>
          <Text style={styles.ButtonText}>{Props.button}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  BeforeText: {
    fontWeight: '500',
    fontSize: 20,
    fontFamily: 'Happiness-Sans-Regular',
    paddingBottom: '1%',
  },
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
  TextBox: {
    backgroundColor: '#FFAAB3',
    paddingHorizontal: '3%',
    paddingVertical: '1.5%',
    borderRadius: 7,
  },
  ButtonText: {
    fontWeight: '700',
    fontSize: 18,
    fontFamily: 'Happiness-Sans-Regular',
    color: 'white',
  },
});
export default BeforeRecommend;
