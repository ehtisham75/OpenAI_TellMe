import React from 'react'
import { View, Text, StatusBar, TouchableOpacity, Image } from 'react-native'
import { Colors } from '../../Assets/Color/Colors'
import { SetStatusBar } from '../ReusableComponents/SetStatusBar'

const LiveLocation = () => {
    return (
        <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <SetStatusBar />

            <Text
                style={{
                    fontSize: 20,
                    color: Colors.PRIMARY_COLOR,
                    fontWeight: '600',
                    marginHorizontal: '5%',
                    textAlign: 'center',
                }}>Please grant location permission to share your location.</Text>

            <TouchableOpacity
                onPress={() => { }}
                style={{
                    width: "80%",
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingVertical: "3.5%",
                    marginTop: "5%",
                    backgroundColor: Colors.b,
                    borderRadius: 10,
                }}>
                <Text
                    style={{
                        fontSize: 16,
                        color: Colors.WHITE_TEXT_COLOR,
                        fontWeight: '600',
                        textAlign: 'center',
                    }}>Share Location</Text>
            </TouchableOpacity>
        </View>
    )
}

export default LiveLocation