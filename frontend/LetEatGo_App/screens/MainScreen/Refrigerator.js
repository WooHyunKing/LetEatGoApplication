import React, {useState, useEffect} from 'react';
import {
  Text,
  TextInput,
  StatusBar,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from 'react-native';
import axios from 'axios';
import {useRecoilState} from 'recoil';
import Category from '../SubScreen/categoryIndex';
import IngreCategory from '../SubScreen/IngredientsAdd';
import FindIcon from '../SubScreen/findIcon';
import userkey from '../../recoils/userKey';
import Topbar from '../Bar/Topbar';
import userid from '../../recoils/userId';
import {getActionFromState} from '@react-navigation/native';

const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

function Refrigerator({navigation}) {
  const [text, setText] = useState('');
  const onChangeText = payload => setText(payload);
  const [selectedList, setSelectedList] = useState([]);
  const [USERID, setUserId] = useRecoilState(userkey);
  const [Delete, setDelete] = useState(false);
  const [Post, setPost] = useState(false);

  async function deleteIngred(userid, index) {
    try {
      const response = await axios.delete(
        `http://10.0.2.2:80/user/ingredient?index=${index}userid=${userid}`,
      );

      // console.log(response.data.result);
      setSelectedList(response.data.result);
      setDelete(true);
    } catch (error) {
      console.log('here');
      console.error(error);
    }
  }
  async function getIngred(userid) {
    try {
      const response = await axios.get(
        `http://10.0.2.2:80/user/ingredient?userid=${userid}`,
      );
      // console.log(response.data.result);
      setSelectedList(response.data.result);
    } catch (error) {
      console.log('here');
      console.error(error);
    }
  }

  async function postIngre(id, selectedList) {
    try {
      const response = await axios.post('http://10.0.2.2:80/user/ingredient', {
        userid: id,
        material: selectedList,
      });
      setPost(true);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if (Delete) {
      getIngred(USERID);
    }
  }, [Delete]);

  useEffect(() => {
    if (Post) {
      getIngred(USERID);
    }
  }, [Post]);

  useEffect(() => {
    getIngred(USERID);
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Topbar navigation={navigation} />
      <Text
        style={{
          paddingLeft: 20,
          paddingVertical: 17,
          fontSize: 25,
          fontWeight: '800',
        }}>
        나의 냉장고 🧊
      </Text>

      <View style={{flexDirection: 'row', flexWrap: 'wrap', marginLeft: 17}}>
        {selectedList ? (
          selectedList.map((key, index) => (
            <View
              key={index}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 10,
              }}>
              <FindIcon
                key={key.index}
                category={key.category}
                foodname={key.materials}
              />

              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    fontSize: 12,
                    // marginLeft: 18,
                    fontFamily: 'Happiness-Sans-Regular',
                  }}>
                  {key.materials}
                </Text>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => {
                    deleteIngred(USERID, key.index);
                    setDelete(false);
                  }}>
                  <Image
                    source={require('../../android/app/assets/icons/deleteIcon.png')}
                    style={{
                      width: 17,
                      height: 17,
                      marginLeft: 5,
                    }}></Image>
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          <ActivityIndicator style={{marginLeft: '47%', marginBottom: '10%'}} />
        )}
      </View>
      <View style={{position: 'relative'}}>
        <Text
          style={{
            paddingLeft: 20,
            paddingVertical: 17,
            fontSize: 16,
            fontWeight: '800',
          }}>
          재료 추가하기
        </Text>
        <TextInput
          autoCorrect={false}
          onSubmitEditing={() => {
            const postList = [];
            postList.push({name: text, category: -1});
            postIngre(USERID, postList);
            setPost(false);
            setText('');
          }}
          onChangeText={onChangeText}
          style={styles.refrigeSearch}
          value={text}></TextInput>
        <Image
          source={require('../../android/app/assets/icons/PinkSearch.png')}
          style={{
            position: 'absolute',
            top: '68%',
            left: '86%',
          }}></Image>
      </View>
      <ScrollView>
        {Category.map((key, index) => (
          <IngreCategory
            category={key.name}
            array={key.array}
            categoryId={key.id}
            selectedList={selectedList}
            setSelectedList={setSelectedList}
            key={index}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  refrigeSearch: {
    backgroundColor: 'white',
    width: Width * 0.92,
    height: Height * 0.045,
    marginLeft: '3.5%',
    borderRadius: 18,
    fontSize: 15.5,
    fontFamily: 'Happiness-Sans-Regular',
    elevation: 3,
  },
});
export default Refrigerator;
