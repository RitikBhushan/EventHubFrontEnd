import React, {useEffect, useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation, useRoute} from '@react-navigation/native';
import SyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';
const WelcomeScreen = () => {
  const navigation = useNavigation();
  const {params: id} = useRoute();
  const [isUser, setIsuser] = useState(false);
  const [getToken, setToken] = useState('');
  const [getUserName, setUserName] = useState('');
  const handleTocken = async () => {
    const token = await SyncStorage.getItem('userToken');
    setToken(token);
  };
  handleTocken();
  const handleUser = async () => {
    const updateUser = await SyncStorage.getItem('user');
    setUserName(updateUser);
  };
  useEffect(() => {
    handleUser();
    if (getToken) {
      setIsuser(true);
    }

    console.log('userTok', isUser);
    console.log('user', getUserName);
  }, [id, getUserName]);
  return (
    <SafeAreaView className="flex-1 flex justify-around bg-white">
      <View className="flex-row justify-center">
        {/* <Image
          style={{width: wp(90), height: wp(90)}}
          source={require('../assets/welcome.jpg')}
        /> */}
        {getToken ? (
          <LottieView
            style={{width: wp(90), height: wp(90)}}
            source={require('../assets/wlecome.json')}
            autoPlay
            loop
          />
        ) : (
          <LottieView
            style={{width: wp(90), height: wp(90)}}
            source={require('../assets/login.json')}
            autoPlay
            loop
          />
        )}
      </View>
      <View className="flex-col items-center rounded-full">
        <Image
          style={{width: wp(30), height: wp(30)}}
          source={require('../assets/logo.jpeg')}
        />
        <Text style={{fontSize: wp(6)}} className="text-black font-light">
          Event<Text className="text-blue-400 font-semibold">Hub</Text>
        </Text>
      </View>
      {getToken ? (
        <View className="flex-col flex items-center">
          <View className="flex-col w-full space-y-4 p-10 items-center">
            {getUserName === 'Teacher@JNU' ? (
              <TouchableOpacity className="p-4 w-full border-[2px] border-green-600  rounded-2xl">
                <Text
                  style={{fontSize: wp(4.5)}}
                  onPress={() => navigation.navigate('Home', getUserName)}
                  className="text-green-600 font-semibold text-center">
                  Professor
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => navigation.navigate('Home')}
                className="p-4 w-full border-[2px] border-blue-600 bg-blue-600 rounded-2xl">
                <Text
                  style={{fontSize: wp(4.5)}}
                  className=" text-cyan-50 font-semibold text-center">
                  Student
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      ) : (
        <View className="flex-col flex items-center ">
          <View className="flex-col w-full space-y-4 p-10 items-center">
            <TouchableOpacity
              onPress={() => navigation.navigate('Login')}
              className="p-4 w-full border border-gray-800 bg-gray-800 rounded-2xl">
              <Text
                style={{fontSize: wp(4)}}
                className="text-white text-center">
                Login
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="p-4 w-full border-[1.5px] border-gray-500 rounded-2xl"
              onPress={() => navigation.navigate('Register')}>
              <Text
                style={{fontSize: wp(4)}}
                className="text-black text-center">
                Register
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <View className="flex-col items-center">
        <TouchableOpacity
          onPress={() => navigation.navigate('About')}
          className="">
          <Text
            style={{fontSize: wp(3.8)}}
            className=" text-cyan-500 font-semibold text-center">
            About US
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
