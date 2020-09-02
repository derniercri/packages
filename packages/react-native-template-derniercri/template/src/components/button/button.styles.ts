import { StyleSheet } from 'react-native'

import colors from '../../styles/_colors'

const buttonStyles = StyleSheet.create({
  disabled: {
    backgroundColor: colors.grayLight,
  },
  text: {
    textTransform: 'uppercase',
  },
  wrapper: {
    alignItems: 'center',
    backgroundColor: colors.blue,
    borderRadius: 40,
    display: 'flex',
    justifyContent: 'center',
    padding: 20,
  },
})

export default buttonStyles
