import { Alert, SafeAreaView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import TextInput from '../../components/TextInput';
import { Formik } from 'formik';
import * as yup from 'yup';
import { auth } from '../../config/firebase';
import { db } from '../../config/firebase';

import { createUserWithEmailAndPassword, sendEmailVerification, AuthErrorCodes } from 'firebase/auth';
import { collection, query, where, getDocs, doc, setDoc } from 'firebase/firestore';

const VALIDATION_SCHEMA = yup.object().shape({
  emailAddress: yup.string().email('Please enter valid email.').required('Email Address is Required.'),
  username: yup
    .string()
    .min(5, ({ min }) => `Username must be at least ${min} characters.`)
    .required('Username is required.'),
  password: yup
    .string()
    .min(6, ({ min }) => `Password must be at least ${min} characters.`)
    .required('Password is required.'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Confirm Password must match password.')
    .required('Confirm Password is required.'),
});

const RegisterScreen = ({ navigation }) => {
  const handleRegister = async (emailAddress, username, password) => {
    try {
      const querySnapshot = await getDocs(query(collection(db, 'users'), where('username', '==', username)));
      if (querySnapshot.size > 0) {
        Alert.alert('That username is already registered.  Please try again.');
        return;
      }
      const newUser = await createUserWithEmailAndPassword(auth, emailAddress, password);
      await setDoc(doc(db, 'users', newUser.user.uid), { username });
      await sendEmailVerification(newUser.user);
      Alert.alert('Make sure to verify your email in order to post parties!');
    } catch (error) {
      handleRegisterError(error);
    }
  };

  const handleRegisterError = (error) => {
    switch (error.code) {
      // TODO handle additional error codes ?
      case AuthErrorCodes.EMAIL_EXISTS:
        Alert.alert('That email address is already in use!');
        break;
      default:
        Alert.alert('An unknown error occurred. Please try again.');
    }
  };

  return (
    <SafeAreaView className='bg-white min-h-full dark:bg-black'>
      <StatusBar hidden='true' />
      <Formik
        validationSchema={VALIDATION_SCHEMA}
        initialValues={{ emailAddress: '', username: '', password: '', confirmPassword: '' }}
        onSubmit={(values) => handleRegister(values.emailAddress, values.username, values.password)}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View className='mx-4'>
            <View className='flex flex-col gap-y-4 w-full mt-4'>
              <View>
                <Text className='font-bold text-md mb-1'> Email Address </Text>
                <TextInput
                  name='emailAddress'
                  autoCapitalize='none'
                  keyboardType='email-address'
                  textContentType='emailAddress'
                  autoFocus={true}
                  placeholder='your .edu email'
                  onChangeText={handleChange('emailAddress')}
                  onBlur={handleBlur('emailAddress')}
                  value={values.emailAddress}
                />
                {errors.emailAddress && touched.emailAddress && (
                  <Text className='text-xs mt-0.5 text-red-500'>{errors.emailAddress}</Text>
                )}
              </View>
              <View>
                <Text className='font-bold text-md mb-1'> Username </Text>
                <TextInput
                  name='username'
                  autoCapitalize='none'
                  textContentType='username'
                  autoFocus={true}
                  placeholder='your username'
                  onChangeText={handleChange('username')}
                  onBlur={handleBlur('username')}
                  value={values.username}
                />
                {errors.username && touched.username && (
                  <Text className='text-xs mt-0.5 text-red-500'>{errors.username}</Text>
                )}
              </View>

              <View>
                <Text className='font-bold text-md mb-1'> Password </Text>
                <TextInput
                  name='password'
                  placeholder='your password'
                  autoCapitalize='none'
                  autoCorrect={false}
                  textContentType='password'
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  secureTextEntry
                />
                {errors.password && touched.password && (
                  <Text className='text-xs mt-0.5 text-red-500'>{errors.password}</Text>
                )}
              </View>
              <View>
                <Text className='font-bold text-md mb-1'> Repeat Password </Text>
                <TextInput
                  name='password'
                  placeholder='confirm your password'
                  autoCapitalize='none'
                  autoCorrect={false}
                  textContentType='password'
                  value={values.confirmPassword}
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  secureTextEntry
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <Text className='text-xs mt-0.5 text-red-500'>{errors.confirmPassword}</Text>
                )}
              </View>
            </View>
            <TouchableOpacity className='p-3 bg-primary rounded-xl mt-6' onPress={() => handleSubmit()}>
              <Text className='text-center text-white text-xl font-bold'>Sign In</Text>
            </TouchableOpacity>
            <Text className='text-primary text-center mx-7'>
              By signing up, you are agreeing to our
              <Text className='font-bold'> T.O.S </Text>
              and <Text className='font-bold'> Privacy Policy </Text>.
            </Text>
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default RegisterScreen;
