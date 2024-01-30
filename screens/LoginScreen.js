import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import SyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [getloading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        'https://collegeapplicationbackend.onrender.com/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
            password,
          }),
        },
      );

      if (response.ok) {
        const responseData = await response.json();
        await SyncStorage.setItem('userToken', responseData?.token);
        const check = await SyncStorage.getItem('userToken');
        console.log('Login successful');
        await SyncStorage.setItem('user', username);
        const checkUser = await SyncStorage.getItem('user');
        console.log('User', checkUser);
        setLoading(false);
        if (check) {
          navigation.navigate('Welcome', responseData?.token);
        }
      } else {
        setLoading(false);

        // Login failed, handle the error scenario here
        console.log('Login failed');
        const errorData = await response.json();
        console.log('Error:', errorData);
      }
    } catch (error) {
      // Handle network errors
      console.error('Network error:', error);
    }
  };

  return (
    <SafeAreaView className=" space-y-10 p-6 ">
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="rounded-xl p-1 ">
        <Text style={{fontSize: wp(6)}} className="text-blue-500 font-semibold">
          Back
        </Text>
      </TouchableOpacity>
      <Text style={{fontSize: wp(8)}} className="text-black  font-black">
        Welcome back! Glad to see you, Again!
      </Text>
      <View className=" flex-col items-center space-y-4 w-full">
        <TextInput
          placeholder="Enter your Username"
          className="bg-gray-200 w-full p-4  rounded-2xl  "
          value={username}
          onChangeText={text => setUsername(text)}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry
          className="bg-gray-200 w-full p-4 rounded-2xl  "
          value={password}
          onChangeText={text => setPassword(text)}
        />
      </View>
      <View className="flex-col space-y-4 items-center">
        {getloading ? (
          <LottieView
            style={{width: wp(30), height: wp(30)}}
            source={require('../assets/load.json')}
            autoPlay
            loop
          />
        ) : (
          <TouchableOpacity
            onPress={handleLogin}
            className="p-4 w-full border  border-gray-800 bg-gray-800 rounded-2xl">
            <Text style={{fontSize: wp(4)}} className="text-white text-center">
              Login
            </Text>
          </TouchableOpacity>
        )}
        <View className="flex-col items-center">
          <Text>
            Don't have an account?
            <Text
              onPress={() => navigation.navigate('Register')}
              className="text-cyan-600">
              {' '}
              Register Now
            </Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
