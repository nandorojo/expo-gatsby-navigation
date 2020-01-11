import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Link } from 'expo-gatsby-navigation'

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home Screen 🥳</Text>
      <Link style={{ color: 'green', fontSize: 20 }} routeName="Profile">
        Click me to open profile :)
      </Link>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    margin: 20,
  },
})
