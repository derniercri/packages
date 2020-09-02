import { useHeaderHeight } from '@react-navigation/stack'
import React from 'react'
import {
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  TouchableWithoutFeedback,
  ViewProps,
} from 'react-native'

import { isIos } from '../../modules/utils'
import globalStyles from '../../styles/globalStyles'

interface ScreenProps extends ViewProps {
  additionalOffset?: number
}

const Screen: React.FC<ScreenProps> = ({
  additionalOffset = 0,
  children,
  style,
  ...props
}) => {
  const headerHeight = useHeaderHeight()
  const offset = isIos ? headerHeight + additionalOffset : 0

  return (
    <KeyboardAvoidingView
      behavior={isIos ? 'padding' : undefined}
      style={[globalStyles.full, style]}
      keyboardVerticalOffset={offset}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={globalStyles.full} {...props}>
          {children}
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

export default Screen
