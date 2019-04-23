

import React from 'react'
import { View, Text, Image } from 'react-native'

export const Spinner1 = () => {
    return (
        <View>
            <Image source={require('./Photos/darkspinner.gif')}
                style={{ margin: 'auto', }} />
        </View>
    )
}

export const Spinner2 = () => {
    return (
        <View>
            <Image source={require('./Photos/lightspinner.gif')}
                style={{ margin: 'auto', }} />
        </View>
    )
}


