import React, {useEffect, useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {
  ArrowLeftStartOnRectangleIcon,
  ArrowUturnLeftIcon,
  Bars3CenterLeftIcon,
  BookOpenIcon,
} from 'react-native-heroicons/outline';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LottieView from 'lottie-react-native';
import SyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const Header = () => {
  const navigation = useNavigation();

  const [isSideNavbarOpen, setIsSideNavbarOpen] = useState(false);
  const [getUser, setUser] = useState('');

  const toggleSideNavbar = () => {
    setIsSideNavbarOpen(!isSideNavbarOpen);
  };
  const handleLogout = async () => {
    await SyncStorage.removeItem('userToken');
    await SyncStorage.removeItem('user');
    navigation.navigate('Welcome', 'sdf');
  };
  const handleUser = async () => {
    const userUpdate = await SyncStorage.getItem('user');
    setUser(userUpdate);
  };
  useEffect(() => {
    handleUser();
  }, [getUser]);

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <BookOpenIcon size={30} strokeWidth={2} color="black" />
      {/* <LottieView
        style={{width: wp(20), height: wp(20)}}
        source={require('../assets/book.json')}
        autoPlay
        loop
      /> */}
      <Text style={{fontSize: wp(7.5), fontWeight: 'bold'}}>
        Event
        <Text className=" text-blue-500">Hub</Text>
      </Text>
      <TouchableOpacity onPress={toggleSideNavbar}>
        <Bars3CenterLeftIcon size={30} strokeWidth={2} color="black" />
      </TouchableOpacity>
      {isSideNavbarOpen && (
        <View
          style={{
            width: wp(80),
            height: hp(100),
          }}
          className="  absolute top-0 right-0 z-50 flex-1 justify-between rounded-l-3xl bg-blue-400  ">
          {/* Your side navbar content goes here */}
          <View className="">
            <TouchableOpacity
              className="bg-blue-400 p-5  flex  items-start rounded-full"
              onPress={toggleSideNavbar}>
              <ArrowUturnLeftIcon size={30} strokeWidth={2} color="white" />
            </TouchableOpacity>
            <View className="flex  justify-center items-center">
              <Image
                style={{width: wp(50), height: wp(50)}}
                source={require('../assets/maleProfile.png')}
              />
              <Text className="text-gray-300 font-bold text-">User Name</Text>
              <Text className="text-white font-bold text-2xl">{getUser}</Text>
            </View>
          </View>
          <View className="pb-10 flex justify-center items-center">
            <TouchableOpacity
              onPress={handleLogout}
              className="border-2  flex-row space-x-2 border-white px-8 py-2 rounded-xl ">
              <ArrowLeftStartOnRectangleIcon
                size={30}
                strokeWidth={2}
                color="white"
              />
              <Text className="text-xl text-white font-semibold">Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default Header;
