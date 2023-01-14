import React, {useState, useEffect} from 'react';
import {
  Text,
  Image,
  View,
  StatusBar,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Topbar from '../Bar/Topbar';
import axios from 'axios';
import userkey from '../../recoils/userKey';
import {atom, useRecoilState} from 'recoil';
import selectIcon from '../../data/selectionIcon';

const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

function SelectCount(Props) {
  count = Props.count;
  if (count <= 4) {
    id = count;
    return <Image source={selectIcon[id].src}></Image>;
  } else {
    id = 5;
    return (
      <TouchableOpacity
        onPress={() => {
          Props.postFood();

          Props.setLike([]);
          Props.setDislike([]);
          Props.setCount(0);

          Props.navigation.navigate('AfterSurvey');
          Props.getFood();
        }}>
        <Image source={selectIcon[id].src}></Image>
      </TouchableOpacity>
    );
  }
}

function ButtonImage(Props) {
  useEffect(() => {
    if (Props.count == 0) {
      Props.setSelect(false);
    }
  }, [Props.count]);

  if (Props.Select === true) {
    return (
      <Image
        source={require('../../android/app/assets/icons/CheckButton.png')}></Image>
    );
  } else {
    return (
      <Image
        source={require('../../android/app/assets/icons/NonCheckButton.png')}></Image>
    );
  }
}

function ImageList(Props) {
  const [Select, setSelect] = useState(false);

  count = Props.count;
  setCount = Props.setCount;

  foodName = Props.foodName;
  src = Props.source;

  return (
    <View
      style={{
        marginTop: Height * 0.01,
        marginBottom: 12,
        position: 'relative',
        width: Height * 0.138,
        height: Height * 0.17,
        alignItems: 'center',
        marginLeft: Width * 0.025,
      }}>
      <Image
        style={styles.selectImage}
        source={
          src
            ? {
                uri: src,
              }
            : null
        }></Image>
      <TouchableOpacity
        activeOpacity={1}
        style={{position: 'absolute', top: '65%', left: '78%'}}
        onPress={() => {
          if (Select) {
            setCount(count - 1);
            newdisLike = Props.dislike;
            newdisLike.push(Props.foodId);
            Props.setDislike(newdisLike);
            Props.like.forEach((item, index) => {
              if (item === Props.foodId) {
                newLike = Props.like;

                newLike = newLike.filter(element => element != Props.foodId);

                Props.setLike(newLike);
              }
            });
          } else {
            setCount(count + 1);
            newLike = Props.like;
            newLike.push(Props.foodId);
            Props.setLike(newLike);

            Props.dislike.forEach((item, index) => {
              if (item === Props.foodId) {
                newDislike = Props.dislike;

                newDislike = newDislike.filter(
                  element => element != Props.foodId,
                );

                Props.setDislike(newDislike);
              }
            });
            console.log(Props.dislike);
            console.log(Props.like);
          }
          setSelect(!Select);
        }}>
        <ButtonImage Select={Select} setSelect={setSelect} count={count} />
      </TouchableOpacity>
      <Text style={{fontWeight: '400'}}>{foodName}</Text>
    </View>
  );
}

function Survey({navigation}) {
  const [count, setCount] = useState(0);
  const [food, setFood] = useState([]);
  const [like, setLike] = useState([]);
  const [dislike, setDislike] = useState([]);
  const [KEY, setKey] = useRecoilState(userkey);

  async function getFood() {
    try {
      const response = await axios.get('http://3.34.153.73:8081/survey');

      setFood(response.data.food);
      if (response.data.food) {
        const newDislike = Object.keys(response.data.food).map(
          key => response.data.food[key].foodid,
        );
        setDislike(newDislike);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const postFood = async () => {
    let body = {
      userid: KEY,
      prefer: {
        like,
        dislike,
      },
    };

    console.log(body);

    try {
      const response = await axios.post(
        'http://3.34.153.73:8081/survey/save',
        body,
      );

      // console.log(response.data);
    } catch (e) {
      console.log('error');
      console.log(JSON.stringify(e));
      return e;
    }
  };

  useEffect(() => {
    getFood();
  }, []);

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <Topbar navigation={navigation} />
      <View style={styles.box}>
        <Text style={styles.InfoText}>좋아하는 음식을 5개 이상 고르면</Text>
        <Text style={styles.InfoText}>취향에 맞는 레시피를 추천해드려요!</Text>
      </View>
      <View
        style={{
          height: Height * 0.78,
          position: 'relative',
          paddingLeft: Width * 0.05,
        }}>
        <ScrollView>
          <View
            style={{
              marginBottom: 30,
              flexWrap: 'wrap',
              flexDirection: 'row',
            }}>
            {food ? (
              food.map((key, index) => (
                <ImageList
                  count={count}
                  key={index}
                  foodName={key.Name}
                  setCount={setCount}
                  source={key.Image}
                  foodId={key.foodid}
                  like={like}
                  setLike={setLike}
                  dislike={dislike}
                  setDislike={setDislike}
                />
              ))
            ) : (
              <ActivityIndicator animating={true} color="white" size="large" />
            )}
          </View>
        </ScrollView>
        <LinearGradient
          style={{
            position: 'absolute',
            opacity: 1,
            zIndex: 100, // 우현아 안드로이드는 elevation이래..바꿔서 쓰렴
            top: Height * 0.65,
            width: Width,
            alignItems: 'center',
          }}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          colors={['#ffffff00', 'white']}>
          <SelectCount
            count={count}
            setCount={setCount}
            postFood={postFood}
            like={like}
            getFood={getFood}
            setLike={setLike}
            dislike={dislike}
            setDislike={setDislike}
            navigation={navigation}
          />
        </LinearGradient>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  selectImage: {
    height: Height * 0.138,
    width: Height * 0.135,
    marginHorizontal: Width * 0.01,
    marginBottom: Height * 0.01,
    borderBottomRightRadius: 13,
  },
  block: {
    backgroundColor: '#FFCDD2',
    paddingVertical: Height * 0.007,
    borderBottomRightRadius: 23,
    marginBottom: Height * 0.006,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '900',
    color: 'white',
    fontFamily: 'Happiness-Sans-Bold',
  },
  box: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  InfoText: {
    fontFamily: 'Happiness-Sans-Bold',
    fontWeight: '400',
    fontSize: 16,
    paddingTop: Height * 0.005,
    marginBottom: Height * 0.005,
  },
});

export default Survey;
