import React from 'react'
import { Text, View } from 'react-native'

import { act, render } from '../../test-utils'

import Screen from './screen'

it('renders correctly', async () => {
  render(
    <Screen>
      <View>
        <Text>Screen testing</Text>
      </View>
    </Screen>,
  )

  // This line below prevents Jest from crying about `act` usage.
  await act(async () => {})
})
