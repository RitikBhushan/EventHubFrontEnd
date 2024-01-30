import {useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import LottieView from 'lottie-react-native';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Bars3CenterLeftIcon,
  BookOpenIcon,
  PlusIcon,
} from 'react-native-heroicons/outline';

import EventCard from '../Components/eventCard';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import {getEvents} from '../api/eventAPI';
import Header from '../Components/header';
import SyncStorage from '@react-native-async-storage/async-storage';

const EventsScreen = () => {
  const {params: item} = useRoute();
  const navigation = useNavigation();
  const [events, setEvents] = useState([]);
  const [getLoading, setLoading] = useState(false);
  const [getUserName, setUserName] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const fetchedEvents = await getEvents();
        setEvents(fetchedEvents);
      } catch (error) {
        // Handle the error, show an error message or retry
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, [events]);
  const handelRoute = id => {
    navigation.navigate('EventDetails', id);
  };
  const handleUser = async () => {
    const updateUser = await SyncStorage.getItem('user');
    setUserName(updateUser);
  };
  useEffect(() => {
    handleUser();
    console.log('user', getUserName);
  }, [getUserName]);

  // console.log(events);
  return (
    <SafeAreaView className="flex-1 p-5 space-y-5">
      {/* <StatusBar style="light" /> */}
      <Header />

      <ScrollView showsVerticalScrollIndicator={false} className="">
        {events ? (
          events.map((data, index) =>
            data?.selectedFieldOfStudy?.includes(
              item.split(' ').slice(0, -2).join(' '),
            ) &&
            data?.selectedSemesters?.includes(
              item.split(' ').slice(-2).join(' '),
            ) ? (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => handelRoute(data._id)}
                key={index}>
                <EventCard data={data} />
              </TouchableOpacity>
            ) : null,
          )
        ) : (
          <View className="text-6xl flex justify-center items-center"></View>
        )}
        <View className="w-full flex-row items-center justify-center">
          <LottieView
            style={{width: wp(35), height: wp(35)}}
            source={require('../assets/eventLoad.json')}
            autoPlay
            loop
          />
        </View>
      </ScrollView>
      {getUserName === 'Teacher@JNU' && (
        <TouchableOpacity
          onPress={() => navigation.navigate('Create')}
          className="absolute right-8 bottom-10 bg-blue-600 p-4 rounded-full">
          <PlusIcon size="30" strokeWidth={2} color="white" className="" />
        </TouchableOpacity>
      )}
      <View className="flex flex-row px-2  justify-between">
        <Text style={{fontSize: wp(4)}} className="font-semibold">
          {item.split(' ').slice(0, -2).join(' ')} {item.split(' ').splice(-2)}
          {/* {item.split(' ').slice(-2).join(' ')} */}
        </Text>
        <Text style={{fontSize: wp(4)}} className="font-semibold"></Text>
      </View>
    </SafeAreaView>
  );
};

export default EventsScreen;
