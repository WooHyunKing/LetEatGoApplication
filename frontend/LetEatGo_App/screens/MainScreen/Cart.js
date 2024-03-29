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
  Dimensions,
  StyleSheet,
} from 'react-native';
import {useRecoilState} from 'recoil';
import axios from 'axios';

import Category from '../SubScreen/categoryIndex';
import CartCategory from '../SubScreen/cartAdd';
import postRefrig from '../../recoils/postRefrig';
import userkey from '../../recoils/userKey';
import Topbar from '../Bar/Topbar';

const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

function Cart({navigation}) {
  const [text, setText] = useState('');
  const onChangeText = payload => setText(payload);
  const [selectedList, setSelectedList] = useState([]);
  const [Delete, setDelete] = useState(false);
  const [USERID, setUserId] = useRecoilState(userkey);
  const [POST, setPOST] = useRecoilState(postRefrig);
  const [cartpost, setCartpost] = useState(false);

  async function postcart(id, selectedList) {
    try {
      const response = await axios.post('http://3.34.153.73:8081/user/cart', {
        userid: USERID,
        material: selectedList,
      });
      console.log(selectedList);
      setCartpost(true);
    } catch (e) {
      console.log(e);
    }
  }

  async function deleteList(userid, index) {
    try {
      const response = await axios.delete(
        `http://3.34.153.73:8081/user/cart?index=${index}userid=${userid}}`,
      );
      console.log('delete');
      console.log(response.data.result);
      setSelectedList(response.data.result);
      setDelete(true);
    } catch (error) {
      console.error(error);
    }
  }
  async function postIngre(id, selectedList) {
    try {
      const response = await axios.post(
        'http://3.34.153.73:8081/user/ingredient',
        {
          userid: id,
          material: selectedList,
        },
      );
      setPOST(true);
    } catch (e) {
      console.log(e);
    }
  }

  async function getList() {
    try {
      const response = await axios.get(
        `http://3.34.153.73:8081/user/cart?userid=${USERID}`,
      );

      console.log(response.data.result);
      setSelectedList(response.data.result);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (Delete) {
      getList();
    }
  }, [Delete]);

  useEffect(() => {
    if (cartpost) {
      getList();
    }
  }, [cartpost]);

  useEffect(() => {
    getList();
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Topbar navigation={navigation} />
      <Text
        style={{
          paddingLeft: Width * 0.05,
          paddingVertical: Height * 0.03,
          fontSize: 30,
          // fontWeight: '800',
          fontFamily: 'GangwonEduAllBold',
        }}>
        나의 장바구니 🛒
      </Text>
      <View style={{flexDirection: 'row'}}>
        <Text
          style={{
            paddingLeft: Width * 0.04,
            fontSize: 18,
            fontWeight: '400',
            fontFamily: 'GangwonEduAllLight',
          }}>
          구매 후
        </Text>
        <Image
          source={require('../../android/app/assets/icons/addButton.png')}
          style={{
            width: Width * 0.05,
            height: Width * 0.05,
            marginHorizontal: Width * 0.01,
          }}></Image>
        <Text
          style={{
            fontSize: 18,
            // fontWeight: '400',
            fontFamily: 'GangwonEduAllLight',
          }}>
          버튼을 눌러 냉장고로 식재료를 옮겨보세요!
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          marginHorizontal: 17,
          alignItems: 'center',
        }}>
        {selectedList ? (
          selectedList.map((key, index) => (
            <View
              key={index}
              style={{
                marginBottom: 10,
              }}>
              <View style={styles.cartList}>
                <Text
                  style={{
                    fontSize: 17,
                    // marginLeft: 18,
                    fontFamily: 'GangwonEduAllBold',
                  }}>
                  {key.materials}
                </Text>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => {
                    postIngre(USERID, [{name: key.materials, category: -1}]);
                    setPOST(false);
                    deleteList(USERID, key.index);
                    setDelete(false);
                  }}>
                  <Image
                    source={require('../../android/app/assets/icons/addButton.png')}
                    style={{
                      width: 20,
                      height: 20,
                      marginLeft: 5,
                      marginRight: 3,
                    }}></Image>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => {
                    deleteList(USERID, key.index);
                    setDelete(false);
                  }}>
                  <Image
                    source={require('../../android/app/assets/icons/trashcan.png')}
                    style={{
                      width: 17,
                      height: 17,
                      marginRight: 5,
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
            fontSize: 20,
            // fontWeight: '800',
            fontFamily: 'GangwonEduAllBold',
          }}>
          장바구니 추가하기
        </Text>
        <TextInput
          autoCorrect={false}
          onSubmitEditing={() => {
            const list = [];
            list.push(text);
            postcart(USERID, list);
            setCartpost(false);
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
          <CartCategory
            category={key.name}
            array={key.array}
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
  cartList: {
    borderRadius: 23,
    borderColor: '#949494',
    borderStyle: 'solid',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    paddingLeft: 10,
    marginHorizontal: 4,
    marginTop: 5,
    width: Width * 0.42,
    borderWidth: 1,
  },
  refrigeSearch: {
    backgroundColor: 'white',
    width: Width * 0.92,
    height: Height * 0.052,
    marginLeft: '3%',
    borderRadius: 18,
    fontSize: 15,
    fontFamily: 'GangwonEduAllBold',
    elevation: 3,
    paddingLeft: Width * 0.04,
  },
});

export default Cart;
