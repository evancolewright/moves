import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { Ionicons } from '@expo/vector-icons';

import PartyFinderScreen from '../screens/party/PartyFinderScreen';
import PartyDetailsScreen from '../screens/party/PartyDetailsScreen';
import CreateAPartyScreen from '../screens/party/CreateAPartyScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import ChangePasswordScreen from '../screens/profile/ChangePasswordScreen';

const AppStack = () => {
  const BottomTab = createBottomTabNavigator();

  return (
    <BottomTab.Navigator screenOptions={{ tabBarActiveTintColor: '#8b5cf6', tabBarShowLabel: false }}>
      <BottomTab.Screen
        name='FindParty'
        tabBarOptions
        component={FindPartyNavigator}
        options={{
          headerShown: false,
          tabBarLabel: 'Find Party',
          tabBarIcon: ({ color }) => <Icon name='ios-map' color={color} size={26} />,
        }}
      />
      <BottomTab.Screen
        name='CreateParty'
        component={CreatePartyNavigator}
        options={{
          headerShown: false,
          tabBarLabel: 'Create Party',
          tabBarIcon: ({ color }) => <Ionicons name='ios-create-sharp' size={26} color={color} />,
        }}
      />
      <BottomTab.Screen
        name='ProfileTab'
        component={ProfileNavigator}
        options={{
          headerShown: false,
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => <Icon name='ios-person' color={color} size={26} />,
        }}
      />
    </BottomTab.Navigator>
  );
};

const FindPartyNavigator = () => {
  const FindPartyStack = createStackNavigator();
  return (
    <FindPartyStack.Navigator screenOptions={{ headerShown: false }}>
      <FindPartyStack.Screen name='Find' component={PartyFinderScreen} />
      <FindPartyStack.Screen name='Details' component={PartyDetailsScreen} />
    </FindPartyStack.Navigator>
  );
};

const CreatePartyNavigator = () => {
  const CreatePartyStack = createStackNavigator();
  return (
    <CreatePartyStack.Navigator screenOptions={{ headerShown: false }}>
      <CreatePartyStack.Screen name='Create' component={CreateAPartyScreen} />
    </CreatePartyStack.Navigator>
  );
};

const ProfileNavigator = () => {
  const ProfileStack = createStackNavigator();
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen name='Profile' component={ProfileScreen} />
      <ProfileStack.Screen name='Change Password' component={ChangePasswordScreen} />
    </ProfileStack.Navigator>
  );
};

export default AppStack;
