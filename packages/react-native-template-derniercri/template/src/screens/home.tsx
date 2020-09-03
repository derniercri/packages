/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react'
import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import { Header, Colors } from 'react-native/Libraries/NewAppScreen'

import Screen from '../components/screen'
import env from '../modules/env'

declare const global: { HermesInternal: null | {} }

const Home = () => (
  <>
    <StatusBar barStyle="dark-content" />
    <Screen>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}
      >
        <Header />
        {global.HermesInternal == null ? null : (
          <View style={styles.engine}>
            <Text style={styles.footer}>Engine: Hermes</Text>
          </View>
        )}
        <View style={styles.body}>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>
              Congratulations ! {env.IF_YOU_HAPPY_CLAP_YOUR_HANDS}
            </Text>
            <Text style={styles.sectionDescription}>
              You made HelloWorld become real!
            </Text>
          </View>
        </View>
      </ScrollView>
    </Screen>
  </>
)

const styles = StyleSheet.create({
  body: {
    backgroundColor: Colors.white,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionDescription: {
    color: Colors.dark,
    fontSize: 18,
    fontWeight: '400',
    marginTop: 8,
  },
  sectionTitle: {
    color: Colors.black,
    fontSize: 24,
    fontWeight: '600',
  },
})

export default Home
