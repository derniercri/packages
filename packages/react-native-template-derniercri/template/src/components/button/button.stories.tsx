import { storiesOf } from '@storybook/react-native'
import React from 'react'

import Button from './'

storiesOf('Button', module)
  .add('default', () => <Button>Hello, World !</Button>)
  .add('disabled', () => <Button disabled>Disabled</Button>)
