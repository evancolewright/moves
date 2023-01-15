import { Alert, SafeAreaView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import TextInput from '../../components/TextInput';
import { Formik } from 'formik';
import * as yup from 'yup';
import { auth } from '../../config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const VALIDATION_SCHEMA = yup.object().shape({
  emailAddress: yup.string().email('Please enter a valid email.').required('Email Address is Required.'),
  password: yup
    .string()
    .min(6, ({ min }) => `Password must be at least ${min} characters.`)
    .required('Password is required.'),
});

const SignInScreen = ({ navigation }) => {
  const handleSignIn = (emailAddress, password) => {
    signInWithEmailAndPassword(auth, emailAddress, password).catch((error) => handleSignInError(error));
  };

  const handleSignInError = (error) => {
    switch (error.code) {
      case 'auth/wrong-password':
        Alert.alert('You have entered an invalid password.  Please try again.');
        break;
      case 'auth/user-not-found':
        Alert.alert('A user with that email was not found. Please try again.');
        break;
      case 'auth/user-disabled':
        Alert.alert('Your account has been disabled. Please contact support if this is an error.');
        break;
      default:
        Alert.alert(`An unknown error occurred. Error code: ${error.code}`);
    }
  };
  return (
    <SafeAreaView className='bg-white dark:bg-black'>
      <StatusBar hidden='true' />
      <View className='h-full mx-4 flex justify-center'>
        <Text className='text-4xl font-black text-secondary mb-4'>Moves🍺</Text>
        <Formik
          validationSchema={VALIDATION_SCHEMA}
          initialValues={{ emailAddress: '', password: '' }}
          onSubmit={(values) => handleSignIn(values.emailAddress, values.password)}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <>
              <View className='flex flex-col gap-y-4 w-full'>
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
              </View>
              <TouchableOpacity className='p-3 bg-primary rounded-xl mt-6' onPress={() => handleSubmit()}>
                <Text className='text-center text-white text-xl font-bold'>Sign In</Text>
              </TouchableOpacity>
              <View className='flex flex-row justify-between mt-4'>
                <TouchableOpacity onPress={() => navigation.navigate('Forgot Password')}>
                  <Text className='text-primary font-bold'>Forgot Password</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                  <Text className='text-primary font-bold'>Register</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  );
};

export default SignInScreen;
