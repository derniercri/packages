import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createStore } from '@reduxjs/toolkit'
import {
  act,
  cleanup,
  fireEvent,
  render as rntlRender,
} from '@testing-library/react-native'
import React from 'react'
import { View } from 'react-native'
import { Provider } from 'react-redux'

import reducer from './store/reducer'

const Stack = createStackNavigator()

function render(
  ui: React.ReactElement,
  {
    initialState,
    store = createStore(reducer, initialState),
    ...renderOptions
  } = {} as any,
) {
  const Wrapper: React.FC = ({ children }) => {
    const Wrapped: React.FC = () => <View>{children}</View>

    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Test" component={Wrapped} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    )
  }
  return rntlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

export { act, cleanup, fireEvent, render }
