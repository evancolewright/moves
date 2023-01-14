import { TextInput as RNTextInput } from 'react-native';

const TextInput = ({ ...props }) => {
  return <RNTextInput {...props} className='bg-lightGray rounded-xl p-3 w-full' />;
};

export default TextInput;
