import React from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'

const Wheater = ({ result }) => {

    const { name, main } = result
    if(!name) return null

    console.log(result)

    return (
        <>
        <View style={styles.weather}>
          <Text></Text>
        </View>
        </>
    )
}

export default Wheater

const styles = StyleSheet.create({
  weather: {

  }
})