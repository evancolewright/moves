import { createStackNavigator } from '@react-navigation/stack';

import RegisterScreen from '../screens/authentication/RegisterScreen';
import SignInScreen from '../screens/authentication/SignInScreen';
import ForgotPasswordScreen from '../screens/authentication/ForgotPasswordScreen';

const AuthStack = () => {
  const AuthStack = createStackNavigator();
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name='Sign In' component={SignInScreen} options={{ headerShown: false }} />
      <AuthStack.Screen
        name='Register'
        component={RegisterScreen}
        options={{
          headerTintColor: '#393939',
        }}
      />
      <AuthStack.Screen
        name='Forgot Password'
        component={ForgotPasswordScreen}
        options={{
          headerTintColor: '#393939',
        }}
      />
    </AuthStack.Navigator>
  );
};

export default AuthStack;
