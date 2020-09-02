import React, { useCallback } from 'react'
import { GestureResponderEvent, Text, TouchableOpacity } from 'react-native'

import buttonStyles from './button.styles'
import { ButtonProps } from './button.types'

const Button: React.FC<ButtonProps> = ({
  onPress,
  testID,
  children,
  disabled,
  ...props
}) => {
  const handlePress = useCallback(
    (event: GestureResponderEvent) => {
      if (disabled) {
        return null
      }
      return onPress && onPress(event)
    },
    [disabled, onPress],
  )

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[buttonStyles.wrapper, disabled && buttonStyles.disabled]}
      activeOpacity={0.4}
      testID={testID}
      {...props}
    >
      {typeof children === 'string' ? (
        <Text style={buttonStyles.text}>{children}</Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  )
}

export default Button
