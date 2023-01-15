import { SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { signOut } from 'firebase/auth';

import { auth } from '../../config/firebase';

const ProfileScreen = ({ navigation }) => {
  return (
    <SafeAreaView>
      <Text>Profile Screen </Text>
      <TouchableOpacity onPress={() => signOut(auth)}>
        <Text> Sign Out </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ProfileScreen;
