import React from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Dimensions,
  Image,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const img = "'../assets/Computer/year1.png'";
const classCard = ({data, course, colors}) => {
  const navigation = useNavigation();
  const handleClick = item => {
    navigation.navigate('Events', item);
  };
  console.log('new', data);
  return (
    <View className="my-4 ">
      <Text className={`text-gray-600 font-bold text-2xl mb-5`}>{course}</Text>

      <Carousel
        data={data}
        renderItem={({item}) => (
          <MainCard item={item} handleClick={handleClick} />
        )}
        firstItem={1}
        // layout={'stack'}
        // layoutCardOffset={`18`}
        layout={'default'}
        inactiveSlideOpacity={0.2}
        sliderWidth={wp(100)}
        itemWidth={wp(65)}
        slideStyle={{display: 'flex'}}
      />
    </View>
  );
};

export default classCard;

const MainCard = ({item, handleClick}) => {
  console.log('log item', item);
  return (
    <TouchableWithoutFeedback onPress={() => handleClick(item.detail)}>
      {
        <View className="relative">
          <Image
            // source={require('../assets/Image/moviePoster1.png')}
            source={{
              uri: `${item.path}`,
            }}
            style={{
              width: wp(60),
              height: wp(55),
            }}
            className="rounded-3xl"
          />
          {/* <Image source={img} style={{width: 15, height: 15}} /> */}
          <Text className="text-gray-500  w-full font-extrabold  text-2xl text-center">
            {item.Year}
          </Text>
        </View>
      }
    </TouchableWithoutFeedback>
  );
};
