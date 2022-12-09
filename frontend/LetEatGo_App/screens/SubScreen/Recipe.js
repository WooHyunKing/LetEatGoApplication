import {useScrollToTop} from '@react-navigation/native';
import axios from 'axios';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  Dimensions,
  Share,
  Alert,
} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import YoutubePlayer from 'react-native-youtube-iframe';
import WebView from 'react-native-webview';
import IngredientComponent from './IngredientComponent';
import Topbar from '../Bar/Topbar';
import RecipeTopArea from './RecipeTopArea';
import foodid from '../../recoils/foodid';
import recipename from '../../recoils/recipename';
import userkey from '../../recoils/userKey';
import FindIcon from './findIcon';
import {useRecoilState} from 'recoil';

const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

function Recipe({navigation, route}) {
  const FoodId = useRecoilState(foodid);
  const [userId, setUserId] = useRecoilState(userkey);
  const [error, setError] = useState('');
  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [made, setMade] = useState(false);
  const [madeCount, setMadeCount] = useState(0);
  const [view, setView] = useState(174334);
  const [orders, setOrders] = useState({});
  const [detail, setDetail] = useState('');
  const [showDetail, setShowDetail] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [foodName, setFoodName] = useRecoilState(recipename);
  const [videoName, setVideoName] = useState('');
  const [videoId, setVideoId] = useState('j7s9VRsrm9o');
  const [materials1, setMaterials1] = useState([]);

  useEffect(() => {
    getData(userId, FoodId);
  }, []);

  async function getData(userid, FoodId) {
    try {
      function getUniques(array) {
        return [...new Set(array)];
      }

      const response = await axios.get(
        `http://10.0.2.2:80/recipe?foodid=${FoodId}&userid=${userId}`,
      );
      console.log('here');
      console.log(response.data.recipe.general.material);
      setDetail(response.data.recipe.detail);
      setOrders(response.data.recipe.general.order);
      setFoodName(response.data.recipe.general.foodname);
      setMaterials1(
        getUniques(Object.values(response.data.recipe.general.material)),
      );
      console.log(materials1);
    } catch (e) {
      console.log(e);
    }
  }

  function addCart(item) {
    const ingredient = [];

    ingredient.push(item);
    console.log('ingredient add');
    console.log(ingredient);
    postcart(userId, ingredient);
  }
  async function postcart(id, selectedList) {
    try {
      const response = await axios.post('http://10.0.2.2:80/user/cart', {
        userid: id,
        material: selectedList,
      });
    } catch (e) {
      console.log(e);
    }
  }

  const materialList = materials1.map(material => (
    <IngredientComponent food_name={material} key={material} />
  ));

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Topbar navigation={navigation} />
      <RecipeTopArea food_name={foodName} />
      <View style={{flex: 0.55}}>
        <ScrollView
          style={{
            paddingLeft: Width * 0.04,
            paddingRight: Width * 0.03,
            flex: 1,
            paddingTop: Height * 0.02,
          }}>
          <View style={{flex: 0.45}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: Height * 0.01,
              }}>
              <Text style={{color: '#FFCDD2'}}>식재료</Text>
              <TouchableOpacity
                style={{
                  backgroundColor: '#A4A4A4',
                  borderRadius: 10,
                  padding: 3,
                  marginRight: Width * 0.012,
                }}
                onPress={() => {
                  showDetail ? setShowDetail(false) : setShowDetail(true);
                }}>
                <Text style={{fontSize: 12, color: 'white'}}>자세히 보기</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                // justifyContent: 'space-between',
                flexWrap: 'wrap',
                marginTop: Height * 0.01,
              }}>
              {materials1.map((key, index) => (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.5}
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginVertical: Width * 0.02,
                  }}
                  onPress={() => {
                    Alert.alert(`장바구니에 ${key}를 추가하시겠습니까?`, '', [
                      {
                        text: '네',
                        onPress: () => {
                          addCart(key);
                        },
                      },
                      {
                        text: '아니오',
                      },
                    ]);
                  }}>
                  <Image
                    source={require('../../android/app/assets/icons/smallAddButton.png')}
                    style={{marginLeft: 50}}></Image>
                  <FindIcon key={index} category={-1} foodname={key} />
                  <Text
                    style={{
                      fontSize: 12,
                      // marginLeft: 18,
                      fontFamily: 'Happiness-Sans-Regular',
                    }}>
                    {key}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* <View
              style={{
                flexDirection: 'row',
                // marginBottom: Height * 0.02,
                // marginLeft: Width * 0.01,
                flexWrap: 'wrap',
              }}>
              {materialList}
            </View> */}
          </View>

          <Text style={{paddingHorizontal: Width * 0.01}}>
            {showDetail ? detail : null}
          </Text>

          <View
            style={{
              flex: 0.1,
              marginBottom: Height * 0.05,
              marginTop: Height * 0.02,
            }}>
            <Text style={{color: '#FFCDD2'}}>레시피</Text>
            {orders.order1 ? (
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <Text style={styles.indexText}>1</Text>
                <View style={{flexShrink: 1}}>
                  <Text style={{marginTop: Width * 0.04}}>
                    {('' + orders.order1).substring(2)}
                  </Text>
                  <Image
                    style={{
                      width: Width * 0.5,
                      height: Height * 0.17,
                      borderRadius: 12,
                    }}
                    source={{
                      uri: orders.order1_img,
                    }}
                  />
                </View>
              </View>
            ) : null}

            {orders.order2 ? (
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.indexText}>2</Text>
                <View style={{flexShrink: 1}}>
                  <Text style={{marginTop: Width * 0.04, flexShrink: 1}}>
                    {('' + orders.order2).substring(2)}
                  </Text>
                  <Image
                    style={{
                      width: Width * 0.5,
                      height: Height * 0.17,
                      borderRadius: 12,
                    }}
                    source={{
                      uri: orders.order2_img,
                    }}
                  />
                </View>
              </View>
            ) : null}
            {orders.order3 ? (
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.indexText}>3</Text>

                <View style={{flexShrink: 1}}>
                  <Text style={{marginTop: Width * 0.04, flexShrink: 1}}>
                    {('' + orders.order3).substring(2)}
                  </Text>
                  <Image
                    style={{
                      width: Width * 0.5,
                      height: Height * 0.17,
                      borderRadius: 12,
                    }}
                    source={{
                      uri: orders.order3_img,
                    }}
                  />
                </View>
              </View>
            ) : null}

            {orders.order4 ? (
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.indexText}>4</Text>
                <View style={{flexShrink: 1}}>
                  <Text style={{marginTop: Width * 0.04, flexShrink: 1}}>
                    {('' + orders.order4).substring(2)}
                  </Text>
                  <Image
                    style={{
                      width: Width * 0.5,
                      height: Height * 0.17,
                      borderRadius: 12,
                    }}
                    source={{
                      uri: orders.order4_img,
                    }}
                  />
                </View>
              </View>
            ) : null}
            {orders.order5 ? (
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.indexText}>5</Text>
                <View style={{flexShrink: 1}}>
                  <Text style={{marginTop: Width * 0.04, flexShrink: 1}}>
                    {('' + orders.order5).substring(2)}
                  </Text>
                  <Image
                    style={{
                      width: Width * 0.5,
                      height: Height * 0.17,
                      borderRadius: 12,
                    }}
                    source={{
                      uri: orders.order5_img,
                    }}
                  />
                </View>
              </View>
            ) : null}
            {orders.order6 ? (
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.indexText}>6</Text>
                <View style={{flexShrink: 1}}>
                  <Text style={{marginTop: Width * 0.04, flexShrink: 1}}>
                    {('' + orders.order6).substring(2)}
                  </Text>
                  <Image
                    style={{
                      width: Width * 0.5,
                      height: Height * 0.17,
                      borderRadius: 12,
                    }}
                    source={{
                      uri: orders.order6_img,
                    }}
                  />
                </View>
              </View>
            ) : null}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topButton: {
    height: Height * 0.05,
    backgroundColor: 'white',
    flexDirection: 'row',
    borderRadius: 20,
    width: Width * 0.15,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Width * 0.01,
    elevation: 1,
  },
  bottomButton: {
    height: Height * 0.05,
    backgroundColor: 'white',
    flexDirection: 'row',
    borderRadius: 20,
    width: Width * 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Width * 0.01,
    elevation: 1,
  },
  bottomButtonText: {
    fontSize: 19,
    backgroundColor: 'white',
    marginLeft: 5,
  },
  bottomButtonText2: {
    fontSize: 13,
    backgroundColor: 'white',
    marginLeft: 5,
  },
  image: {
    height: Height * 0.15,
    width: Height * 0.15,
  },
  text: {
    fontSize: 17,
    fontWeight: '900',
    padding: 5,
    flex: 0.5,
    marginBottom: Height * 0.01,
    // backgroundColor: 'blue',
  },
  topButtonText: {
    fontSize: 14,
    backgroundColor: 'white',
    marginLeft: 5,
  },
  iconArea: {
    backgroundColor: 'white',
    height: Height * 0.12,
    width: Width * 0.12,
  },
  icon: {
    height: Height * 0.12,
    width: Width * 0.12,
    marginRight: Width * 0.07,
  },
  texticon: {
    height: Height * 0.02,
    width: Width * 0.03,
    margin: Width * 0.04,
    resizeMode: 'stretch',
  },
  indexText: {
    paddingHorizontal: '3.5%',
    fontFamily: 'Roboto-Bold',
    fontStyle: 'italic',
    fontWeight: '900',
    color: '#FFAAB3',
    fontSize: 23,
    marginTop: Height * 0.012,
  },
});

export default Recipe;
