import { useHeaderHeight } from '@react-navigation/stack'
import React, { useMemo } from 'react'
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
  const offset = useMemo(() => (isIos ? headerHeight + additionalOffset : 0), [
    additionalOffset,
    headerHeight,
  ])

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
