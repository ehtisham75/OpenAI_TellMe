import React, { useState, useEffect } from 'react';
import { Text, View, StatusBar, TouchableOpacity, Image,StyleSheet } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation, CommonActions } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import changeNavigationBarColor, { hideNavigationBar, showNavigationBar, } from 'react-native-navigation-bar-color';


const NoNetConnected = () => {
    return (
        <View>
            <Text>NoNetConnected</Text>
        </View>
    )
}

export default NoNetConnected

const styles = StyleSheet.create({

})