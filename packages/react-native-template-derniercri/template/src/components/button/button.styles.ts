import { StyleSheet } from 'react-native';

const buttonStyles = StyleSheet.create({
  text: {
    textTransform: 'uppercase',
  },
  disabled: {
    backgroundColor: '#7B8794',
  },
  wrapper: {
    alignItems: 'center',
    backgroundColor: '#87FDF6',
    borderRadius: 40,
    display: 'flex',
    justifyContent: 'center',
    padding: 20,
  },
});

export default buttonStyles;
