/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';

import Form from './app/components/Form'
import Weather from './app/components/Weather'
import FlashMessage, { showMessage, hideMessage } from 'react-native-flash-message'

const App = () => {

  const [search, setSearch] = React.useState({
    city: '',
    country: ''
  })
  const [query, setQuery] = React.useState(false)
  const [result, setResult] = React.useState({})

  React.useEffect(() => {
    const { city, country } = search
    const queryingWeather = async () => {
      if (query === true) {
        console.log('querying the API...')
        const appId = '9d17dc119c9ac71d841f4ae815bf5123'
        const URL = `http://api.openweathermap.org/data/2.5/forecast/daily?q=${city},${country}&appid=${appId}`
        console.log(URL)

        try {
          const request = await fetch(URL)
          const requesting = await request.json()
          console.log(requesting)
          setResult(requesting)
          setQuery(false)
        } catch (err) {
          showMessage({
            message: "Something is bad, try again later.:(",
            type: "danger",
            animated: true,
            animationDuration: 225,
            floating: true
          });
          setQuery(false)
        }
      }
    }
    queryingWeather()
  }, [query])

  const hideKeyboard = () => {
    Keyboard.dismiss()
  }



  return (
    <>
      <StatusBar backgroundColor={'rgb(71, 149, 212)'} />
      <TouchableWithoutFeedback onPress={() => hideKeyboard()}>
        <View style={styles.app}>
          <View style={styles.container}>
            <Form search={search} setSearch={setSearch} query={query} setQuery={setQuery} />
            <Weather result={result} />
          </View>
        </View>
      </TouchableWithoutFeedback>
      <FlashMessage position={'top'} />
    </>
  );
};

export default App;


const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: 'rgb(71, 149, 212)',
  },
  container: {
    marginHorizontal: '2.5%'
  }
})