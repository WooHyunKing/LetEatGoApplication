import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

function Topbar({navigation}) {
  return (
    <LinearGradient
      style={styles.block}
      colors={['#FFCDD2', '#FFAAB3']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}>
      <Text style={styles.text}>입맛춤</Text>
      <View style={styles.StatusBarIcon}>
        {/* <TouchableOpacity
          style={{marginRight: Width * 0.78, marginTop: Width * 0.005}}
          activeOpacity={0.7}
          onPress={() => navigation.pop()}>
          <Image source={require('../../android/app/assets/icons/Back.png')} />
        </TouchableOpacity> */}
        <TouchableOpacity
          style={{marginRight: Width * 0.01, marginTop: Width * 0.005}}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('Search')}>
          <Image
            source={require('../../android/app/assets/icons/Search.png')}
          />
        </TouchableOpacity>
        {/* <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.navigate('Notice')}>
          <Image
            source={require('../../android/app/assets/icons/Notice.png')}
          />
        </TouchableOpacity> */}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  statusBarPlaceholder: {
    backgroundColor: '#FFCDD2',
  },
  block: {
    backgroundColor: '#FFCDD2',
    paddingVertical: Height * 0.0146,
    borderBottomRightRadius: 23,
    marginBottom: Height * 0.006,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
  text: {
    fontSize: 20,
    // fontWeight: '900',
    color: 'white',
    fontFamily: 'GangwonEduAllBold',
    // paddingRight: Width * 0.226,
  },

  StatusBarIcon: {
    position: 'absolute',
    flexDirection: 'row',
    right: Width * 0.03,
    top: Height * 0.015,
  },
});

export default Topbar;
