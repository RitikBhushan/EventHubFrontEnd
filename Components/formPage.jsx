// FormPage.js
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Button,
  ScrollView,
  Platform,
  Alert,
  // TimePickerAndroid,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  CalendarDaysIcon,
  CameraIcon,
  CheckBadgeIcon,
  ClockIcon,
} from 'react-native-heroicons/outline';
import {useNavigation} from '@react-navigation/native';
const FormPage = () => {
  const navigation = useNavigation();

  const [image, setImage] = useState('');
  const [finalImage, setFinalImage] = useState('');
  const [startDate, setStartDate] = useState('');
  const [time, setTime] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [joiningLink, setJoiningLink] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [aboutCompany, setAboutCompany] = useState('');
  const semesterOptions = ['1 Year', '2 Year', '3 Year', '4 Year'];
  const [selectedSemesters, setSelectedSemesters] = useState([]);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [text, setText] = useState('Empty');

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'android');
    setDate(currentDate);

    if (event.type === 'set' || event.type === 'dismissed') {
      setShow(false);

      // Format the date
      let tempDate = new Date(currentDate);
      let fDate =
        // tempDate.getDate() +
        // '/' +
        // (tempDate.getMonth() + 1) +
        // '/' +
        // tempDate.getFullYear();
        tempDate.toDateString();
      let fTime = tempDate.getHours() + ' : ' + tempDate.getMinutes() + ' AM';
      setText(fDate + '\n' + fTime);

      // Store the date in startDate
      setStartDate(fDate);

      // Store the time in setTime
      setTime(fTime);

      console.log('Date:', fDate);
      console.log('Time:', fTime);
    }
  };
  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const [other, setOther] = useState('');
  const fieldOfStudyOptions = [
    'Computer Science',
    'Food Tech',
    'Bio Tech',
    'Mechanical',
    'Chemical',
    'BioMedical',
  ];
  const [selectedFieldOfStudy, setSelectedFieldOfStudy] = useState([]);
  const featureTags = ['Certificate', 'Workshop', 'Internship'];

  const toggleFeature = feature => {
    if (selectedFeatures.includes(feature)) {
      setSelectedFeatures(selectedFeatures.filter(f => f !== feature));
    } else {
      setSelectedFeatures([...selectedFeatures, feature]);
    }
  };
  const handleImageUpload = async () => {
    try {
      const img = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      setImage(img[0]?.uri);
      console.log('image picked', img[0]?.uri);
    } catch (error) {
      if (DocumentPicker.isCancel(err)) console.log('Cancel');
      else console.log(err);
    }
  };
  // const handleSubmit = () => {
  //   // Handle form submission logic here
  //   console.log({
  //     image,
  //     startDate,
  //     time,
  //     title,
  //     description,
  //     selectedFeatures,
  //     selectedFieldOfStudy,
  //     selectedSemesters,
  //     joiningLink,
  //     companyName,
  //     aboutCompany,
  //     other,
  //   });
  // };
  const toggleFieldOfStudy = field => {
    if (selectedFieldOfStudy.includes(field)) {
      setSelectedFieldOfStudy(selectedFieldOfStudy.filter(f => f !== field));
    } else {
      setSelectedFieldOfStudy([...selectedFieldOfStudy, field]);
    }
  };

  const toggleSemester = semester => {
    if (selectedSemesters.includes(semester)) {
      setSelectedSemesters(selectedSemesters.filter(s => s !== semester));
    } else {
      setSelectedSemesters([...selectedSemesters, semester]);
    }
  };
  const doneImage = () => {
    const data = new FormData();
    data.append('file', {
      uri: image,
      type: 'image/jpeg', // adjust the type based on the selected image type
      name: 'your_image_filename.jpg', // specify a filename for the image
    });
    data.append('upload_preset', 'college_application');
    data.append('cloud_name', 'dxizw3qvz');

    fetch('https://api.cloudinary.com/v1_1/dxizw3qvz/image/upload', {
      method: 'POST',
      body: data,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(res => res.json())
      .then(data => {
        setImage(data?.url);
        console.log('image', image);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const handleSubmit = async () => {
    // Prepare the data for the API request
    const formData = {
      aboutCompany,
      companyName,
      description,
      image,
      joiningLink,
      other,
      selectedFeatures,
      selectedFieldOfStudy,
      selectedSemesters,
      startDate,
      time,
      title,
      // more: 'more',
    };

    if (image) {
      if ((aboutCompany, title, description)) {
        try {
          // Make the API request
          const response = await fetch(
            'https://collegeapplicationbackend.onrender.com/event/create',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData),
            },
          );

          // Check if the request was successful (status code 2xx)
          if (response.ok) {
            navigation.navigate('Home');
            console.log('Event created successfully');
          } else {
            // Handle errors if the request was not successful
            console.error(
              'Failed to create event:',
              response.status,
              response.statusText,
            );
          }
        } catch (error) {
          // Handle network errors
          console.error('Network error:', error.message);
        }
      } else {
        Alert.alert('Please add all the required field');
      }
    } else {
      Alert.alert('Please select the image button');
    }
  };

  return (
    <View className="p-2">
      <Text className="text-xl font-bold mb-4">Event Form</Text>

      {/* Image URL */}
      <TouchableOpacity className=" relative flex-row justify-center">
        <View className="z-40 absolute top-10 flex rounded-full">
          {!image ? (
            <CameraIcon
              size="30"
              onPress={handleImageUpload}
              strokeWidth={2}
              color="black"
              className=""
            />
          ) : (
            <CheckBadgeIcon
              size="30"
              onPress={handleImageUpload}
              strokeWidth={2}
              color="green"
              className=""
            />
          )}
        </View>
        <Image
          source={{uri: image}}
          style={{width: 100, height: 100, marginBottom: 16}}
          className=" opacity-70 rounded-full"
        />
      </TouchableOpacity>
      <Button
        title="click to select Image"
        className="rounded-3xl"
        onPress={doneImage}
      />
      {/* Starting Date */}
      {/* Starting Date */}
      {/* <Text>{text}</Text> */}
      {/* <TextInput
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 8,
          marginBottom: 16,
        }}
        placeholder="Starting Date"
        value={startDate}
        onChangeText={text => setStartDate(text)}
      /> */}

      {/* Ending Date */}
      {/* <TextInput
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 8,
          marginBottom: 16,
        }}
        placeholder="Ending Date"
        value={endDate}
        onChangeText={text => setEndDate(text)}
      /> */}
      <View className=" flex-row gap-x-10 mb-5">
        <TouchableOpacity
          onPress={() => showMode('date')}
          className=" mt-5 p-2 flex-row
           justify-center space-x-2  border rounded text-green-600 border-green-500">
          <CalendarDaysIcon
            size="20"
            onPress={handleImageUpload}
            strokeWidth={2}
            color="green"
            className=""
          />
          <Text className="text-green-600">Select Date</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => showMode('time')}
          className=" mt-5 p-2 border rounded flex-row
          justify-center space-x-2 border-green-500">
          <ClockIcon
            size="20"
            onPress={handleImageUpload}
            strokeWidth={2}
            color="green"
            className=""
          />
          <Text className="text-green-600">Select Time</Text>
        </TouchableOpacity>
      </View>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={false}
          display="default"
          onChange={onChange}
        />
      )}

      {/* Title */}
      <TextInput
        className="border border-gray-300 p-2 mb-4"
        placeholder="Title"
        value={title}
        onChangeText={text => setTitle(text)}
      />

      {/* Description */}
      <TextInput
        className="border border-gray-300 p-2 mb-4"
        placeholder="Description"
        value={description}
        onChangeText={text => setDescription(text)}
        multiline
      />
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{flexDirection: 'row', marginBottom: 16}}>
        {fieldOfStudyOptions.map(field => (
          <TouchableOpacity
            key={field}
            className={`${
              selectedFieldOfStudy.includes(field)
                ? 'bg-green-200 text-white border-green-200'
                : ''
            } border px-3 rounded-xl py-2 mr-2`}
            onPress={() => toggleFieldOfStudy(field)}>
            <Text>{field}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{flexDirection: 'row', marginBottom: 16}}>
        {semesterOptions.map(semester => (
          <TouchableOpacity
            key={semester}
            className={`${
              selectedSemesters.includes(semester)
                ? 'bg-yellow-200 text-white border-yellow-200'
                : ''
            } border px-3 rounded-xl py-2 mr-2`}
            onPress={() => toggleSemester(semester)}>
            <Text>{semester}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Feature selection tags */}
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{flexDirection: 'row', marginBottom: 16}}>
        {featureTags.map(feature => (
          <TouchableOpacity
            key={feature}
            className={`${
              selectedFeatures.includes(feature)
                ? 'bg-purple-200 text-white border-purple-200'
                : ''
            } border px-3 rounded-xl py-2 mr-2`}
            onPress={() => toggleFeature(feature)}>
            <Text>{feature}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Joining Link */}
      <TextInput
        className="border border-gray-300 p-2 mb-4"
        placeholder="Joining Link (URL format)"
        value={joiningLink}
        onChangeText={text => setJoiningLink(text)}
      />

      {/* Company Name */}
      <TextInput
        className="border border-gray-300 p-2 mb-4"
        placeholder="Organization Name"
        value={companyName}
        onChangeText={text => setCompanyName(text)}
      />

      {/* About Company */}
      <TextInput
        className="border border-gray-300 p-2 mb-4"
        placeholder="About Organization"
        value={aboutCompany}
        onChangeText={text => setAboutCompany(text)}
        multiline
      />

      {/* Other Description */}
      <TextInput
        className="border border-gray-300 p-2 mb-4"
        placeholder="Other"
        value={other}
        onChangeText={text => setOther(text)}
        multiline
      />

      {/* Submit button */}
      <TouchableOpacity
        className="bg-blue-500 p-4 mb-6 rounded-full"
        onPress={handleSubmit}>
        <Text className="text-white text-center">Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FormPage;
