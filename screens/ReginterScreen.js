import React, {useState} from 'react';
import {
  Alert,
  Image,
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
import LottieView from 'lottie-react-native';
import {EyeIcon} from 'react-native-heroicons/outline';
const ReginterScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [getloading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleRegistration = async () => {
    setLoading(true);
    if (password === confirmPassword) {
      try {
        const response = await fetch(
          'https://collegeapplicationbackend.onrender.com/auth/register',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username,
              password,
              email,
            }),
          },
        );

        if (response.ok) {
          // Registration successful, you can handle the success scenario here
          console.log('Registration successful');
          setLoading(false);
          navigation.navigate('Login');
        } else {
          // Registration failed, handle the error scenario here
          console.log('Registration failed');
          setLoading(false);
          // You can also parse the response to get more information about the error
          const errorData = await response.json();
          if (errorData.message === 'Username already exists') {
            Alert.alert('User already exist');
          }
          console.log('Error:', errorData);
        }
      } catch (error) {
        // Handle network errors
        setLoading(false);
        console.error('Network error:', error);
      }
    } else {
      setLoading(false);
      Alert.alert('Password does not match');
    }
  };
  // const handleMaleProfile = gender => {
  //   setSelectedImage('male');
  //   console.log(selectedImage);
  // };
  // const handleFemaleProfile = gender => {
  //   setSelectedImage('female');
  //   console.log(selectedImage);
  // };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
        Hello! Register to get started
      </Text>
      <View className=" flex-col items-center space-y-4 w-full">
        {/* <View className="flex-row justify-center items-center gap-2">
          <TouchableOpacity
            onPress={() => handleMaleProfile()}
            style={[
              styles.imageContainer,
              selectedImage === 'male' && styles.selectedImage, // Apply styles if selected
            ]}>
            <Image
              style={[
                styles.image,
                selectedImage === 'male' && styles.selectedImage,
              ]}
              source={require('../assets/maleProfile.png')}
            />
          </TouchableOpacity>
          <View className="h-20 p-0.5 bg-gray-400" />
          <TouchableOpacity
            onPress={() => handleFemaleProfile()}
            style={[
              styles.imageContainer,
              selectedImage === 'female' && styles.selectedImage, // Apply styles if selected
            ]}>
            <Image
              style={[
                styles.image,
                selectedImage === 'female' && styles.selectedImage,
              ]}
              source={require('../assets/femaleProfile.png')}
            />
          </TouchableOpacity>
        </View> */}

        <TextInput
          placeholder="Username"
          className="bg-gray-200 w-full p-4  rounded-2xl  "
          value={username}
          onChangeText={text => setUsername(text)}
        />
        <TextInput
          placeholder="Email"
          className="bg-gray-200 w-full p-4  rounded-2xl  "
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <View className="relative w-full flex-row  items-center ">
          <TextInput
            placeholder="Password"
            secureTextEntry
            className="bg-gray-200 w-full p-4 rounded-2xl  "
            value={password}
            onChangeText={text => setPassword(text)}
          />
        </View>
        <TextInput
          placeholder="Confirm Password"
          secureTextEntry
          className="bg-gray-200 w-full p-4 rounded-2xl  "
          value={confirmPassword}
          onChangeText={text => setConfirmPassword(text)}
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
            onPress={handleRegistration}
            className="p-4 w-full border  border-gray-800 bg-gray-800 rounded-2xl">
            <Text style={{fontSize: wp(4)}} className="text-white text-center">
              Register
            </Text>
          </TouchableOpacity>
        )}
        <View className="flex-col items-center">
          <Text>
            Already have an account?
            <Text
              onPress={() => navigation.navigate('Login')}
              className="text-cyan-600">
              {' '}
              Login Now
            </Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  imageContainer: {
    borderRadius: wp(35) / 2, // Half of the width and height of the image
    overflow: 'hidden',
    borderWidth: wp(1),
    borderColor: 'transparent',
  },
  image: {
    width: wp(35),
    height: wp(35),
  },
  selectedImage: {
    borderColor: 'gray',
  },
});

export default ReginterScreen;
