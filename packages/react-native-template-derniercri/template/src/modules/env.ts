/**
 * This file aims to centralize Environment-related things.
 * It also allows you to strongly type your environment variables.
 *
 * And if you wanna change you environment implementation later,
 * you don't have to change imports etc.
 */

import { Config } from 'react-native-config'

type Env = {
  IF_YOU_HAPPY_CLAP_YOUR_HANDS: string
  ANDROID_APP_ID: string
  IS_STORYBOOK: 'true' | 'false'
}

const env = Config as Env
export default env
