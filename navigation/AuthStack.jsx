import { createStackNavigator } from '@react-navigation/stack';

import RegisterScreen from '../screens/authentication/RegisterScreen';
import SignInScreen from '../screens/authentication/SignInScreen';
import ForgotPasswordScreen from '../screens/authentication/ForgotPasswordScreen';

const AuthStack = () => {
  const AuthStack = createStackNavigator();
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name='SignIn' component={SignInScreen} options={{ headerShown: false }} />
      <AuthStack.Screen name='Register' component={RegisterScreen} />
      <AuthStack.Screen name='ForgotPassword' component={ForgotPasswordScreen} />
    </AuthStack.Navigator>
  );
};

export default AuthStack;
