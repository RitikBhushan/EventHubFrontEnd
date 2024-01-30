import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FormPage from '../Components/formPage';
import {
  Bars3CenterLeftIcon,
  BookOpenIcon,
} from 'react-native-heroicons/outline';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import Header from '../Components/header';
const CreateEvent = () => {
  return (
    <SafeAreaView className="p-5">
      <Header />
      <ScrollView showsVerticalScrollIndicator={false} className="mt-4">
        <FormPage />
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateEvent;
