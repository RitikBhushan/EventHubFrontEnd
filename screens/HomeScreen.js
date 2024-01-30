import React, {useEffect, useState} from 'react';
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
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  Bars3CenterLeftIcon,
  BookOpenIcon,
} from 'react-native-heroicons/outline';
import ClassCard from '../Components/classCard.jsx';
import LottieView from 'lottie-react-native';
import Header from '../Components/header.jsx';

const HomeScreen = () => {
  const [getUserName, setUserName] = useState('');
  useEffect(() => {
    const handleUser = async () => {
      try {
        const updateUser = await SyncStorage.getItem('userToken');
        setUserName(updateUser);
        console.log('user name', updateUser);
      } catch (error) {
        console.error('Error retrieving user from storage:', error);
      }
    };
    handleUser();
  }, []);
  const dummyArray = {
    Computer_Science: [
      {
        path: 'https://marvel-b1-cdn.bc0a.com/f00000000290162/images.ctfassets.net/2htm8llflwdx/1LEJIT9KGRC4nwTJ5vuS6H/a912e31c468fd32986f2818816135cc4/OnlineLearning_SouthAsia_Learning_Indoor_GettyImages-1071652068.jpg?fit=thumb',
        detail: 'Computer Science 1 Year',
        color: 'Red',
        course: 'Computer Science',
        Year: '1 Year',
      },
      {
        path: 'https://www.zdnet.com/a/img/resize/89b98c0918a56594a2d7a84d46dd5268678161b2/2021/07/19/e28889a7-7c41-4dd8-9899-2ee60d1850e2/computer-science-course-overview-shutterstock-1377112199.jpg?auto=webp&fit=crop&height=1200&width=1200',

        detail: 'Computer Science 2 Year',
        color: 'Red',
        course: 'Computer Science',
        Year: '2 Year',
      },
      {
        path: 'https://www.franklin.edu/sites/default/files/styles/btcb_photo/public/fr/back%20to%20college%20blog/main%20images/two%20computer%20science%20professionals%20using%20equipment.jpg?itok=MrpsVcwO',

        detail: 'Computer Science 3 Year',

        color: 'Red',
        course: 'Computer Science',
        Year: '3 Year',
      },
      {
        path: 'https://cdn.mytrendingstories.com/image/upload/v1633331484/pgn8y689gu4689efk3yd.jpg',
        detail: 'Computer Science 4 Year',
        color: 'Red',
        course: 'Computer Science',
        Year: '4 Year',
      },
    ],
    FoodTech: [
      {
        path: 'https://t3.ftcdn.net/jpg/03/28/37/96/360_F_328379634_ZUaXhYOscQ9b5JECdxBAanoHFXpXICsi.jpg',
        detail: 'Food Tech 1 Year',
        color: 'Red',
        Year: '1 Year',
      },
      {
        path: 'https://img.freepik.com/premium-photo/geneticists-biologists-scientists-are-studying-genetic-structure-vegetables_533890-1400.jpg',
        detail: 'Food Tech 2 Year',
        color: 'Red',
        Year: '2 Year',
      },
      {
        path: 'https://media.licdn.com/dms/image/D5612AQH_R__9jXU9cw/article-cover_image-shrink_720_1280/0/1679330643997?e=2147483647&v=beta&t=JcmpundhlXRHGcKkYCo96o5cqylWFLcSii6FMF9_e5M',
        detail: 'Food Tech 3 Year',
        color: 'Red',
        Year: '3 Year',
      },
      {
        path: 'https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F1c89a6e7-76bc-42d7-84c4-9af81d8eebcb_1280x720.jpeg',
        detail: 'Food Tech 4 Year',
        color: 'Red',
        Year: '4 Year',
      },
    ],
    BioTech: [
      {
        path: 'https://studiousguy.com/wp-content/uploads/2021/09/Biotechnology-Examples.jpg',
        detail: 'Bio Tech 1 Year',
        color: 'Red',
        course: 'Bio Tech',
        Year: '1 Year',
      },
      {
        path: 'https://biotechworldindia.in/wp-content/uploads/2023/03/5132618-1024x683.jpg',
        detail: 'Bio Tech 2 Year',
        color: 'Red',
        course: 'Bio Tech',
        Year: '2 Year',
      },
      {
        path: 'https://graduate.northeastern.edu/resources/wp-content/uploads/sites/4/2020/05/Biotechnology-Salaries.jpg',
        detail: 'Bio Tech 3 Year',
        color: 'Red',
        course: 'Bio Tech',
        Year: '3 Year',
      },
      {
        path: 'https://www.ziprecruiter.com/svc/fotomat/public-ziprecruiter/cms/477867849BiotechNeuroscience.jpg=ws720x480',
        detail: 'Bio Tech 4 Year',
        color: 'Red',
        course: 'Bio Tech',
        Year: '4 Year',
      },
    ],
    Mechanical: [
      {
        path: 'https://indoreinstitute.com/wp-content/uploads/2019/12/me.jpg',
        detail: 'Mechanical 1 Year',
        color: 'Red',
        course: 'Mechanical',
        Year: '1 Year',
      },
      {
        path: 'https://cdn.mos.cms.futurecdn.net/PFxP5HX8oNsLtufFRMumpc-320-80.jpg',
        detail: 'Mechanical 2 Year',
        color: 'Red',
        course: 'Mechanical',
        Year: '2 Year',
      },
      {
        path: 'https://connetix.nl/wp-content/uploads/2023/05/18.png',
        detail: 'Mechanical 3 Year',
        color: 'Red',
        course: 'Mechanical',
        Year: '3 Year',
      },
      {
        path: 'https://blog.visaexperts.com/wp-content/uploads/2020/05/demand-for-Industrial-Mechanical-and-Production-Engineers-in-Australia-.jpg',
        detail: 'Mechanical 4 Year',
        color: 'Red',
        course: 'Mechanical',
        Year: '4 Year',
      },
    ],
    Chemical: [
      {
        path: 'https://www.twi-global.com/image-library/hero/istock-530999831-chemical-engineering.jpg',
        detail: 'Chemical 1 Year',
        color: 'Red',
        course: 'Chemical',
        Year: '1 Year',
      },
      {
        path: 'https://blog.cambridgecoaching.com/hs-fs/hubfs/What%20is%20Chemical%20Engineering.jpeg?width=4000&name=What%20is%20Chemical%20Engineering.jpeg',
        detail: 'Chemical 2 Year',
        color: 'Red',
        course: 'Chemical',
        Year: '2 Year',
      },
      {
        path: 'https://leverageedu.com/blog/wp-content/uploads/2020/10/chemical-engineering.jpg',
        detail: 'Chemical 3 Year',
        color: 'Red',
        course: 'Chemical',
        Year: '3 Year',
      },
      {
        path: 'https://blogassets.leverageedu.com/blog/wp-content/uploads/2019/10/23170454/Engineering-Chemistry.jpg',
        detail: 'Chemical 4 Year',
        color: 'Red',
        course: 'Chemical',
        Year: '4 Year',
      },
    ],
    BioMedical: [
      {
        path: 'https://blogassets.leverageedu.com/blog/wp-content/uploads/2020/05/18122300/Biomedical-Engineering.png',
        detail: 'BioMedical 1 Year',
        color: 'Red',
        course: 'BioMedical',
        Year: '1 Year',
      },
      {
        path: 'https://www.indonesiamengglobal.com/wp-content/uploads/2015/08/global_biologicalengineering-health-drug-experiment-lab-iSk_0.jpg',
        detail: 'BioMedical 2 Year',
        color: 'Red',
        course: 'BioMedical',
        Year: '2 Year',
      },
      {
        path: 'https://www.aboriginalaccess.ca/sites/aboriginalaccess.ca/files/img/hero/Biological-and-Biosystems.jpg',
        detail: 'BioMedical 3 Year',
        color: 'Red',
        course: 'BioMedical',
        Year: '3 Year',
      },
      {
        path: 'https://scienceprog.com/wp-content/uploads/2019/04/biomedical_engineer.jpg',
        detail: 'BioMedical 4 Year',
        color: 'Red',
        course: 'BioMedical',
        Year: '4 Year',
      },
    ],
  };
  const [classData, setClassData] = useState([
    '1 Year',
    '2 Year',
    '3 Year',
    '4 Year',
  ]);

  return (
    <SafeAreaView className=" flex-1 p-5">
      <StatusBar style="light" />
      <Header />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 10}}>
        <View className="flex flex-col items-center  ">
          <LottieView
            style={{width: wp(75), height: wp(75)}}
            source={require('../assets/home.json')}
            autoPlay
            loop
          />
          <Text style={{fontSize: wp(3.5)}}>
            Welcome to our EventHub! We're dedicated to keeping students like
            you informed about all the exciting events happening at your college
            or university. Whether it's a webinar featuring industry experts, a
            seminar on the latest research trends, or a fun campus activity,
            you'll find it all here
          </Text>
        </View>

        {dummyArray &&
          Object.keys(dummyArray).map((course, index) => (
            <View key={index}>
              <ClassCard
                key={index}
                course={course}
                data={dummyArray[course]}
              />
            </View>
          ))}
      </ScrollView>
      <View className="flex w-full items-center">
        <Text>This Application is still under development</Text>
      </View>
    </SafeAreaView>
  );
};
export default HomeScreen;
