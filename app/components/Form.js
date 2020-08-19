import React, { useState } from 'react'
import { Text, View, TextInput, StyleSheet, TouchableWithoutFeedback, Animated, Alert } from 'react-native'
import FlashMessage, { showMessage, hideMessage } from 'react-native-flash-message'
import { Picker } from 'react-native'

const Form = ({ search, setSearch, query, setQuery }) => {

    const { country, city } = search

    const [ animationButton ] = useState(new Animated.Value(1))

    const AnimatedEntry = () => {
        Animated.spring(animationButton, {
          toValue: .8
        }).start()
    }

    const OutAnimated = () => {
        Animated.spring(animationButton, {
            toValue: 1,
            friction: 1,
            tension: 70
          }).start()
    }

    const AnimatedStyle = {
        transform: [{ scale: animationButton }]
    }

    const weather = () => {
        if(country.trim() === '' || city.trim() === '') {
            showMessage({
                message: "Add a country and a city for the search",
                type: "danger",
                animated: true,
                animationDuration: 225,
                floating: true
              });
            return
        }
        setQuery(true)
    }

    return (
        <>
            <View style={styles.form}>
                <TextInput
                    value={search}
                    style={styles.input}
                    onChangeText={ city => setSearch({ ...search, city }) }
                    placeholder='City'
                    placeholderTextColor='#666' />
                <View>
                    <Picker
                      selectedValue={country}
                      itemStyle={{ height: 120, backgroundColor: '#FFF' }}
                      onValueChange={country => setSearch({ ...search, country })}
                    >
                        <Picker.Item label='-- Select a Country--' value='' />
                        <Picker.Item label='Mexico' value='MX' />
                        <Picker.Item label='United States' value='USA' />
                        <Picker.Item label='Costa Rica' value='CR' />
                        <Picker.Item label='Argentina' value='AR' />
                        <Picker.Item label='Colombia' value='CO' />
                        <Picker.Item label='España' value='ES' />
                        <Picker.Item label='Perú' value='PE' />
                    </Picker>
                </View>
                <TouchableWithoutFeedback
                  onPressIn={() => AnimatedEntry()}
                  onPressOut={() => OutAnimated()}
                  onPress={() => weather()}
                >
                    <Animated.View style={[styles.search, AnimatedStyle]}>
                        <Text style={styles.textSearch}>Search Weather</Text>
                    </Animated.View>
                </TouchableWithoutFeedback>
            </View>
            <FlashMessage position="top" />
        </>
    )
}

export default Form

const styles = StyleSheet.create({
    form: {
        marginTop: 100,
        justifyContent: 'center',
        alignContent: 'center',
    },
    input: {
        padding: 10,
        height: 50,
        backgroundColor: '#FFF',
        fontSize: 20,
        marginBottom: 20,
        textAlign: 'center'
    },
    search: {
        marginTop: 50,
        backgroundColor: '#000',
        padding: 10,
        justifyContent: 'center'
    },
    textSearch: {
        color: '#FFF',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: 18
    }
})