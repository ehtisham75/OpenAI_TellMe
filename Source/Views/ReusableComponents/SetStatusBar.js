import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import { Colors } from '../../Assets/Color/Colors'

const SetStatusBar = () => {
    return (
        <StatusBar
            backgroundColor={Colors.PRIMARY_COLOR}
            barStyle={"light-content"}
            translucent={false}
        />
    )
}

export { SetStatusBar }