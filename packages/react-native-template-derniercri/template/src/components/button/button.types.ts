import { ReactNode, ReactText } from 'react'
import { GestureResponderEvent } from 'react-native'

export interface ButtonProps {
  children: ReactText | ReactNode
  onPress?: (event: GestureResponderEvent) => void
  testID?: string
  disabled?: boolean
}
