import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { Provider } from 'react-redux'

import StorybookUIRoot from '../storybook/index'

import env from './modules/env'
import Home from './screens/home'
import store from './store'

const Stack = createStackNavigator()

const App = () => (
  <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  </Provider>
)

export default env.IS_STORYBOOK === 'true' ? StorybookUIRoot : App
