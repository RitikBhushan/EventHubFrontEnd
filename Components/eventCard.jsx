import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {Share} from 'react-native';
import {ShareIcon} from 'react-native-heroicons/outline';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const eventCard = ({data}) => {
  const handleShare = async () => {
    try {
      await Share.share({
        title: data.title,
        message: `${data.title}\n\n${data.description}\n\n${data.joiningLink}\n\n${data.startDate} | ${data.time}`,
        url: data.image,
      });
    } catch (error) {
      console.error('Error sharing event:', error.message);
    }
  };
  return (
    <View className="flex space-y-3 pb-4 my-5 rounded-xl flex-col bg-white items-start">
      <View className="">
        <Image
          style={{width: wp(90), height: wp(40)}}
          source={{uri: data.image}}
          className="rounded-t-xl"
        />
        <View className=" absolute right-2 top-1  rounded-full bg-gray-700">
          <TouchableOpacity onPress={handleShare} style={{padding: 5}}>
            <ShareIcon size={20} strokeWidth={2} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <View className=" space-y-4 px-4">
        <Text style={{fontSize: wp(5)}} className=" text-black font-bold">
          {data.title}
        </Text>
        <Text style={{fontSize: wp(3.6)}}>
          {data.description?.slice(0, 250) + '.....'}
        </Text>
      </View>
      <View className="flex px-4 flex-row items-center space-x-5 justify-between w-full">
        <View>
          <Text className="text-red-500">
            {data.startDate} | {data.time}
          </Text>
        </View>
        <TouchableOpacity className=" border  border-purple-500  rounded-xl">
          <Text
            style={{fontSize: wp(3.5)}}
            className="text-purple-500  py-2 px-3 ">
            Sync now
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default eventCard;
