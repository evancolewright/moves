import { ActivityIndicator, View } from 'react-native';

const LoadingScreen = () => {
  return (
    <View className='flex-1 justify-center'>
      <ActivityIndicator size='large' color='#9933FF' />
    </View>
  );
};

export default LoadingScreen;
