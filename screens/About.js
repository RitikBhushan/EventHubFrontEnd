import React from 'react';
import {Text, View} from 'react-native';
import Header from '../Components/header';

const About = () => {
  return (
    <View className="p-5">
      <Header />
      <View className="py-5 flex space-y-10">
        <View className="space-y-3">
          <Text className="text-xl font-bold">About Us</Text>
          <Text className="text-sm">
            Welcome to our EventHub! We're dedicated to keeping students like
            you informed about all the exciting events happening at your college
            or university. Whether it's a webinar featuring industry experts, a
            seminar on the latest research trends, or a fun campus activity,
            you'll find it all here.
          </Text>
        </View>
        <View className="space-y-3">
          <Text className="text-xl font-bold">Our Mission</Text>
          <Text className="text-sm">
            Our mission is simple: to connect students with valuable
            opportunities for growth, learning, and networking. We understand
            the importance of staying updated on upcoming events, and we're
            committed to making that process as easy and convenient as possible
            for you.
          </Text>
        </View>
        <View className="space-y-3">
          <Text className="text-xl font-bold">Get Involved</Text>
          <Text className="text-sm">
            We're always looking for ways to improve and expand our platform. If
            you have any suggestions, feedback, or would like to collaborate
            with us, we'd love to hear from you! Contact us at
            <Text className="text-blue-400">
              {' '}
              ritikbhushanmain@gmail.com
            </Text>{' '}
            for you.
          </Text>
        </View>
      </View>
    </View>
  );
};

export default About;
