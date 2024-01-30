import {Link, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  Image,
  Linking,
  Button,
  Alert,
} from 'react-native';
import {
  ArrowLeftIcon,
  Bars3CenterLeftIcon,
  BookOpenIcon,
  CheckCircleIcon,
  CheckIcon,
  PlusIcon,
  ShareIcon,
} from 'react-native-heroicons/outline';
import LottieView from 'lottie-react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import Header from '../Components/header';
import SyncStorage from '@react-native-async-storage/async-storage';

const EventDetailScreen = () => {
  const [eventData, seteventData] = useState();
  const {params: id} = useRoute();
  const [getUserName, setUserName] = useState('');

  const navigation = useNavigation();
  const fetchEventData = async () => {
    try {
      const response = await fetch(
        `https://collegeapplicationbackend.onrender.com/event/${id}`,
      );

      if (!response.ok) {
        // Handle non-successful responses here
        console.error(
          'Failed to fetch event data:',
          response.status,
          response.statusText,
        );
        return;
      }

      const eventData = await response.json();
      seteventData(eventData.event);
      console.log('Event data:', eventData);

      // Now you can use the eventData in your component state or wherever you need it
    } catch (error) {
      // Handle errors that may occur during the fetch
      console.error('Error fetching event data:', error);
    }
  };

  // Call the function to fetch event data
  useEffect(() => {
    fetchEventData();
  }, []);
  const handleUser = async () => {
    const updateUser = await SyncStorage.getItem('user');
    setUserName(updateUser);
  };
  useEffect(() => {
    handleUser();
    console.log('user', getUserName);
  }, [getUserName]);

  const handleJoinLinkPress = async () => {
    const url = eventData?.joiningLink;
    try {
      await Linking.openURL(`https://${url}`);
    } catch (error) {
      console.error(
        'Error opening in Chrome, falling back to default browser:',
        error,
      );
      await Linking.openURL(url);
    }
  };
  const handleDelete = async () => {
    try {
      const response = await fetch(
        `https://collegeapplicationbackend.onrender.com/event/${eventData?._id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            // Include any additional headers as needed
          },
          // body: JSON.stringify({/* Include any request payload if needed */}),
        },
      );

      if (response.ok) {
        // Handle success, such as navigating back or updating the UI
        console.log('Event deleted successfully');
        navigation.navigate('Home');
      } else {
        // Handle errors, show an error message, or take appropriate action
        console.error('Error deleting event:', response.statusText);
        Alert.alert('Server Error');
        navigation.navigate('Home');
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error('Error deleting event:', error);
      Alert.alert('Server Error');
      navigation.navigate('Home');
    }
  };
  const handleSyncWithGoogleCalendar = () => {
    const formattedStartDate = eventData?.startDate.replace(/-/g, '');
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      eventData?.title,
    )}&details=${encodeURIComponent(
      eventData?.description,
    )}&dates=${encodeURIComponent(
      formattedStartDate,
    )}&dates=${encodeURIComponent(formattedStartDate)}`;

    Linking.openURL(googleCalendarUrl)
      .then(() => console.log('Opened Google Calendar'))
      .catch(error => console.error('Error opening Google Calendar:', error));
  };

  return (
    <SafeAreaView className="flex-1 p-5 space-y-5">
      {/* <StatusBar style="light" /> */}
      <Header />
      {/* <View className="p-3 bg-gray-300 rounded-full w-10 h-10 flex justify-center items-center">
        <ArrowLeftIcon size="22" strokeWidth={2} color="black" />
      </View> */}
      {eventData ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="mt-6">
            <Image
              style={{width: wp(100), height: wp(50)}}
              source={{uri: eventData?.image}}
              className=""
            />
          </View>
          <View className="flex flex-row justify-between my-4 mx-1">
            <Text className=" font-semibold ">{eventData?.startDate}</Text>
            <Text className=" font-semibold ">{eventData?.time}</Text>
            <ShareIcon
              size="20"
              className="p-2"
              strokeWidth={2}
              color="black"
            />
          </View>
          <View className="flex space-y-4">
            <Text style={{fontSize: wp(6.5)}} className=" font-bold ">
              {eventData?.title}
            </Text>
            <Text
              style={{fontSize: wp(3.6)}}
              className=" text-gray-500 font-medium">
              {eventData?.description}
            </Text>
          </View>
          <View className=" flex flex-row gap-x-4 my-4 items-center justify-center">
            {eventData?.selectedFeatures?.includes('Certificate') && (
              <Text
                style={{fontSize: wp(3.6)}}
                className="bg-purple-400 text-white text-center p-2 rounded-full">
                Certificate{' '}
              </Text>
            )}

            {eventData?.selectedFeatures?.includes('Workshop') && (
              <Text
                style={{fontSize: wp(3.6)}}
                className="bg-blue-400 text-white text-center p-2 rounded-full">
                Workshop{' '}
              </Text>
            )}
            {eventData?.selectedFeatures?.includes('Internship') && (
              <Text
                style={{fontSize: wp(3.6)}}
                className="bg-blue-400 text-white text-center p-2 rounded-full">
                Internship{' '}
              </Text>
            )}
          </View>

          <TouchableOpacity
            onPress={handleJoinLinkPress}
            activeOpacity={0.8}
            className=" flex flex-row gap-x-4 my-4  items-center justify-center">
            <Text
              style={{fontSize: wp(4)}}
              className="bg-cyan-600 text-white px-12 py-4 font-extrabold rounded-2xl text-center">
              Joining Link{' '}
            </Text>
          </TouchableOpacity>

          <View className="p-5 border border-gray-500 mt-5 space-y-3 rounded-xl">
            <Text
              style={{fontSize: wp(6.5)}}
              className=" text-center font-bold text-lg text-blue-500">
              {eventData?.companyName?.toUpperCase()}
            </Text>
            <Text
              style={{fontSize: wp(4.5)}}
              className=" text-center font-bold text-lg text-gray-500">
              About Company
            </Text>
            <Text
              style={{fontSize: wp(3.6)}}
              className=" text-black font-normal">
              {eventData?.aboutCompany}
            </Text>
          </View>
          <View className="flex-row justify-between  w-full px-4   pt-1 border-gray-300 items-center">
            {/* <Text style={{fontSize: wp(4.5)}}>{eventData?.title}</Text> */}
            {getUserName === 'Teacher@JNU' && (
              <TouchableOpacity
                onPress={handleDelete}
                className=" rounded-2xl bg-red-500">
                <Text
                  style={{fontSize: wp(3.6)}}
                  className="text-white px-9 py-3">
                  Delete
                </Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={handleSyncWithGoogleCalendar}
              className=" rounded-2xl bg-purple-500">
              <Text
                style={{fontSize: wp(3.6)}}
                className="text-white px-9 py-3">
                Sync
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      ) : (
        <View className="text-6xl flex justify-center items-center">
          <LottieView
            style={{width: wp(55), height: wp(45)}}
            source={require('../assets/load.json')}
            autoPlay
            loop
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default EventDetailScreen;
