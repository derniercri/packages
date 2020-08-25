import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import StorybookUIRoot from '../storybook/index';

import env from './modules/env';
import Home from './screens/home';

const Stack = createStackNavigator();

const App = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default env.IS_STORYBOOK === 'true' ? StorybookUIRoot : App;
