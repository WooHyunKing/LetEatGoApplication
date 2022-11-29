import React, {useState, useRef, useEffect} from 'react';
import {Text, Image, TouchableOpacity, View, StyleSheet} from 'react-native';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import ItemList from './IngreComponent';
import axios from 'axios';
import {useRecoilState} from 'recoil';

import userkey from '../../recoils/userKey';

function CartCategory(Props) {
  const [USERID, setUserId] = useRecoilState(userkey);
  category = Props.category;
  array = Props.array;
  const setSelectedList = Props.setSelectedList;
  const selectedList = Props.selectedList;
  const [submit, setSubmit] = useState(false);
  const [List, setList] = useState([]);
  const [post, setpost] = useState(false);
  async function postcart(id, selectedList) {
    try {
      const response = await axios.post('http://10.0.2.2:80/user/cart', {
        userid: 97,
        material: selectedList,
      });
      console.log(selectedList);
      setpost(true);
    } catch (e) {
      console.log(e);
    }
  }

  async function getList() {
    try {
      const response = await axios.get(
        `http://10.0.2.2:80/user/cart?userid=97`,
      );

      setSelectedList(response.data.result);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    if (post) {
      getList();
    }
  }, [post]);

  return (
    <Collapse>
      <CollapseHeader>
        <View style={styles.CategoryBox}>
          <Text
            style={{fontFamily: 'Happiness-Sans-Regular', fontWeight: '400'}}>
            {category}
          </Text>
          <Image
            style={{height: 18, width: 18, marginLeft: 5}}
            source={require('../../android/app/assets/icons/arrowIcon.png')}
          />
        </View>
      </CollapseHeader>
      <CollapseBody>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}>
          {array.map(key => (
            <ItemList
              Key={key}
              Array={array}
              Submit={submit}
              setSubmit={setSubmit}
              List={List}
            />
          ))}
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          style={{alignItems: 'center'}}
          onPress={() => {
            setSubmit(true);
            matrialList = List.map(key => key.foodname);
            postcart(USERID, matrialList);
            setpost(false);
            setList([]);
          }}>
          <Image
            source={require('../../android/app/assets/icons/addButton.png')}
            style={{marginTop: '2%'}}></Image>
        </TouchableOpacity>
      </CollapseBody>
    </Collapse>
  );
}

const styles = StyleSheet.create({
  CategoryBox: {
    width: '20%',
    paddingVertical: 6,
    fontStyle: '',
    alignItems: 'center',
    marginLeft: '5%',
    width: '35%',
    marginTop: '6%',
    flexDirection: 'row',
  },
});
export default CartCategory;